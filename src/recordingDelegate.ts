import type { ChildProcess } from 'node:child_process'
import type { Server } from 'node:net'
import type { Readable } from 'node:stream'

import type { API, CameraController, CameraRecordingConfiguration, CameraRecordingDelegate, HAP, HDSProtocolSpecificErrorReason, RecordingPacket } from 'homebridge'

import type { VideoConfig } from './settings.js'
import type { Logger } from './logger.js'
import type { Mp4Session } from './settings.js'

import { Buffer } from 'node:buffer'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createServer } from 'node:net'
import { env } from 'node:process'

import { APIEvent, AudioRecordingCodecType, H264Level, H264Profile } from 'homebridge'

import { PreBuffer } from './prebuffer.js'

import { MP4Atom, FFMpegFragmentedMP4Session, PREBUFFER_LENGTH, ffmpegPathString } from './settings.js'

export async function listenServer(server: Server, log: Logger): Promise<number> {
  let isListening = false
  while (!isListening) {
    const port = 10000 + Math.round(Math.random() * 30000)
    server.listen(port)
    try {
      await once(server, 'listening')
      isListening = true
      const address = server.address()
      if (address && typeof address === 'object' && 'port' in address) {
        return address.port
      }
      throw new Error('Failed to get server address')
    } catch (e: any) {
      log.error('Error while listening to the server:', e)
    }
  }
  // Add a return statement to ensure the function always returns a number
  return 0
}

export async function readLength(readable: Readable, length: number): Promise<Buffer> {
  if (!length) {
    return Buffer.alloc(0)
  }

  {
    const ret = readable.read(length)
    if (ret) {
      return ret
    }
  }

  return new Promise((resolve, reject) => {
    const r = (): void => {
      const ret = readable.read(length)
      if (ret) {
        // eslint-disable-next-line ts/no-use-before-define
        cleanup()
        resolve(ret)
      }
    }

    const e = (): void => {
      // eslint-disable-next-line ts/no-use-before-define
      cleanup()
      reject(new Error(`stream ended during read for minimum ${length} bytes`))
    }

    const cleanup = (): void => {
      readable.removeListener('readable', r)
      readable.removeListener('end', e)
    }

    readable.on('readable', r)
    readable.on('end', e)
  })
}

export async function* parseFragmentedMP4(readable: Readable): AsyncGenerator<MP4Atom> {
  while (true) {
    const header = await readLength(readable, 8)
    const length = header.readInt32BE(0) - 8
    const type = header.slice(4).toString()
    const data = await readLength(readable, length)

    yield {
      header,
      length,
      type,
      data,
    }
  }
}

export class RecordingDelegate implements CameraRecordingDelegate {
  updateRecordingActive(active: boolean): Promise<void> {
    this.log.info(`Recording active status changed to: ${active}`, this.cameraName)
    return Promise.resolve()
  }

  updateRecordingConfiguration(configuration: CameraRecordingConfiguration | undefined): Promise<void> {
    this.log.info('Recording configuration updated', this.cameraName)
    this.currentRecordingConfiguration = configuration
    return Promise.resolve()
  }

  async *handleRecordingStreamRequest(streamId: number): AsyncGenerator<RecordingPacket, any, any> {
    this.log.info(`Recording stream request received for stream ID: ${streamId}`, this.cameraName)
    
    if (!this.currentRecordingConfiguration) {
      this.log.error('No recording configuration available', this.cameraName)
      return
    }

    // Ensure prebuffer is started if prebuffering is enabled
    if (this.videoConfig?.prebuffer) {
      this.log.debug(`HKSV: Prebuffer enabled, ensuring prebuffer is started`, this.cameraName)
      try {
        await this.startPreBuffer()
        this.log.debug(`HKSV: Prebuffer initialization completed`, this.cameraName)
      } catch (error) {
        this.log.error(`HKSV: Failed to start prebuffer: ${error}`, this.cameraName)
        // Continue without prebuffer if it fails
      }
    }

    // Create abort controller for this stream
    const abortController = new AbortController()
    this.streamAbortControllers.set(streamId, abortController)

    try {
      // Use existing handleFragmentsRequests method but track the process
      const fragmentGenerator = this.handleFragmentsRequests(this.currentRecordingConfiguration, streamId)
      
      let fragmentCount = 0
      let totalBytes = 0
      
      for await (const fragmentBuffer of fragmentGenerator) {
        // Check if stream was aborted
        if (abortController.signal.aborted) {
          this.log.debug(`Recording stream ${streamId} aborted, stopping generator`, this.cameraName)
          break
        }
        
        fragmentCount++
        totalBytes += fragmentBuffer.length
        
        // Enhanced logging for HKSV debugging
        this.log.debug(`HKSV: Yielding fragment #${fragmentCount}, size: ${fragmentBuffer.length}, total: ${totalBytes} bytes`, this.cameraName)
        
        yield {
          data: fragmentBuffer,
          isLast: false // We'll handle the last fragment properly when the stream ends
        }
      }
      
      // Send final packet to indicate end of stream
      this.log.info(`HKSV: Recording stream ${streamId} completed. Total fragments: ${fragmentCount}, total bytes: ${totalBytes}`, this.cameraName)
      
    } catch (error) {
      this.log.error(`Recording stream error: ${error}`, this.cameraName)
      // Send error indication
      yield {
        data: Buffer.alloc(0),
        isLast: true
      }
    } finally {
      // Cleanup
      this.streamAbortControllers.delete(streamId)
      this.log.debug(`Recording stream ${streamId} generator finished`, this.cameraName)
    }
  }

  closeRecordingStream(streamId: number, reason: HDSProtocolSpecificErrorReason | undefined): void {
    this.log.info(`Recording stream closed for stream ID: ${streamId}, reason: ${reason}`, this.cameraName)
    
    // Enhanced reason code diagnostics for HKSV debugging
    switch (reason) {
      case 0:
        this.log.info(`✅ HKSV: Recording ended normally (reason 0)`, this.cameraName)
        break
      case 1:
        this.log.warn(`⚠️ HKSV: Recording ended due to generic error (reason 1)`, this.cameraName)
        break
      case 2:
        this.log.warn(`⚠️ HKSV: Recording ended due to network issues (reason 2)`, this.cameraName)
        break
      case 3:
        this.log.warn(`⚠️ HKSV: Recording ended due to insufficient resources (reason 3)`, this.cameraName)
        break
      case 4:
        this.log.warn(`⚠️ HKSV: Recording ended due to HomeKit busy (reason 4)`, this.cameraName)
        break
      case 5:
        this.log.warn(`⚠️ HKSV: Recording ended due to insufficient buffer space (reason 5)`, this.cameraName)
        break
      case 6:
        this.log.warn(`❌ HKSV: Recording ended due to STREAM FORMAT INCOMPATIBILITY (reason 6) - Check H.264 parameters!`, this.cameraName)
        break
      case 7:
        this.log.warn(`⚠️ HKSV: Recording ended due to maximum recording time exceeded (reason 7)`, this.cameraName)
        break
      case 8:
        this.log.warn(`⚠️ HKSV: Recording ended due to HomeKit storage full (reason 8)`, this.cameraName)
        break
      default:
        this.log.warn(`❓ HKSV: Unknown reason ${reason}`, this.cameraName)
    }

    // Abort the stream generator
    const abortController = this.streamAbortControllers.get(streamId)
    if (abortController) {
      abortController.abort()
      this.streamAbortControllers.delete(streamId)
    }
    
    // Kill any active FFmpeg processes for this stream
    const process = this.activeFFmpegProcesses.get(streamId)
    if (process && !process.killed) {
      this.log.debug(`Terminating FFmpeg process for stream ${streamId}`, this.cameraName)
      process.kill('SIGTERM')
      this.activeFFmpegProcesses.delete(streamId)
    }
  }

  private readonly hap: HAP
  private readonly log: Logger
  private readonly cameraName: string
  private readonly videoConfig: VideoConfig
  private process!: ChildProcess

  private readonly videoProcessor: string
  readonly controller?: CameraController
  private preBufferSession?: Mp4Session
  private preBuffer?: PreBuffer
  
  // Add fields for recording configuration and process management
  private currentRecordingConfiguration?: CameraRecordingConfiguration
  private activeFFmpegProcesses = new Map<number, ChildProcess>()
  private streamAbortControllers = new Map<number, AbortController>()

  constructor(log: Logger, cameraName: string, videoConfig: VideoConfig, api: API, hap: HAP, videoProcessor?: string) {
    this.log = log
    this.hap = hap
    this.cameraName = cameraName
    this.videoConfig = videoConfig
    this.videoProcessor = videoProcessor || ffmpegPathString || 'ffmpeg'

    api.on(APIEvent.SHUTDOWN, () => {
      if (this.preBufferSession) {
        this.preBufferSession.process?.kill()
        this.preBufferSession.server?.close()
      }
      
      // Cleanup active streams on shutdown
      this.activeFFmpegProcesses.forEach((process, streamId) => {
        if (!process.killed) {
          this.log.debug(`Shutdown: Terminating FFmpeg process for stream ${streamId}`, this.cameraName)
          process.kill('SIGTERM')
        }
      })
      this.activeFFmpegProcesses.clear()
      this.streamAbortControllers.clear()
    })
  }

  async startPreBuffer(): Promise<void> {
    this.log.info(`start prebuffer ${this.cameraName}, prebuffer: ${this.videoConfig?.prebuffer}`)
    if (this.videoConfig?.prebuffer) {
      // looks like the setupAcessory() is called multiple times during startup. Ensure that Prebuffer runs only once
      if (!this.preBuffer) {
        this.preBuffer = new PreBuffer(this.log, this.videoConfig.source ?? '', this.cameraName, this.videoProcessor)
        if (!this.preBufferSession) {
          this.preBufferSession = await this.preBuffer.startPreBuffer()
        }
      }
    }
  }

  async * handleFragmentsRequests(configuration: CameraRecordingConfiguration, streamId: number): AsyncGenerator<Buffer, void, unknown> {
    let moofBuffer: Buffer | null = null
    let fragmentCount = 0
    
    this.log.debug('HKSV: Starting recording request', this.cameraName)
    const audioArgs: Array<string> = [
      '-acodec',
      'aac',
      ...(configuration.audioCodec.type === AudioRecordingCodecType.AAC_LC
        ? ['-profile:a', 'aac_low']
        : ['-profile:a', 'aac_eld']),
      '-ar', '32000',
      //`${configuration.audioCodec.samplerate * 1000}`, // i see 3k here before, 3000 also will not work
      '-b:a',
      `${configuration.audioCodec.bitrate}k`,
      '-ac',
      `${configuration.audioCodec.audioChannels}`,
    ]

    const profile = configuration.videoCodec.parameters.profile === H264Profile.HIGH
      ? 'high'
      : configuration.videoCodec.parameters.profile === H264Profile.MAIN ? 'main' : 'baseline'

    const level = configuration.videoCodec.parameters.level === H264Level.LEVEL4_0
      ? '4.0'
      : configuration.videoCodec.parameters.level === H264Level.LEVEL3_2 ? '3.2' : '3.1'

    // HKSV-compatible H.264 parameters for recording
    const videoArgs: Array<string> = [
      '-an', '-sn', '-dn',            // Disable audio/subtitles/data (audio handled separately)
      '-vcodec', 'libx264',
      '-pix_fmt', 'yuv420p',
      '-profile:v', profile,          // Use configuration profile
      '-level:v', level,              // Use configuration level
      '-preset', 'veryfast',          // Faster than ultrafast for stability
      '-tune', 'zerolatency',         
      '-b:v', `${configuration.videoCodec.parameters.bitRate}k`, // Use configured bitrate
      '-maxrate', `${Math.floor(configuration.videoCodec.parameters.bitRate * 1.2)}k`, // 20% overhead
      '-bufsize', `${configuration.videoCodec.parameters.bitRate * 2}k`,              // 2x bitrate for buffer
      '-g', '30',                     // GOP size
      '-keyint_min', '15',            // Minimum keyframe interval  
      '-sc_threshold', '0',           // Disable scene change detection
      '-force_key_frames', 'expr:gte(t,n_forced*1)', // Force keyframes every second
      '-r', configuration.videoCodec.resolution[2].toString() // Use configured framerate
    ]

    if (configuration?.audioCodec) {
      // Replace the '-an' flag with audio parameters for HKSV recording
      const anIndex = videoArgs.indexOf('-an')
      if (anIndex !== -1) {
        // Replace -an with audio codec parameters
        videoArgs.splice(anIndex, 1, ...audioArgs)
        this.log.debug(`HKSV: Enabled audio recording with codec parameters`, this.cameraName)
      }
    } else {
      this.log.debug(`HKSV: Audio disabled for recording`, this.cameraName)
    }

    // Get input configuration
    const ffmpegInput: Array<string> = []
    if (this.videoConfig?.prebuffer && this.preBuffer) {
      this.log.debug(`HKSV: Using prebuffer for recording input`, this.cameraName)
      const input: Array<string> = await this.preBuffer.getVideo(configuration.mediaContainerConfiguration.fragmentLength ?? PREBUFFER_LENGTH)
      ffmpegInput.push(...input)
    } else {
      if (!this.videoConfig?.source) {
        throw new Error('No video source configured')
      }
      this.log.debug(`HKSV: Using direct source for recording input`, this.cameraName)
      ffmpegInput.push(...this.videoConfig.source.trim().split(/\s+/).filter(arg => arg.length > 0))
    }
    
    if (ffmpegInput.length === 0) {
      throw new Error('No video source configured for recording')
    }

    // Start FFmpeg session with enhanced error handling
    let session, cp, generator
    try {
      session = await this.startFFMPegFragmetedMP4Session(this.videoProcessor, ffmpegInput, videoArgs)
      cp = session.cp
      generator = session.generator
      
      // Track process for cleanup
      this.activeFFmpegProcesses.set(streamId, cp)
      this.log.debug(`HKSV: FFmpeg process started for stream ${streamId}, PID: ${cp.pid}`, this.cameraName)
    } catch (error) {
      this.log.error(`HKSV: Failed to start FFmpeg session: ${error}`, this.cameraName)
      throw new Error(`FFmpeg session startup failed: ${error}`)
    }

    let pending: Array<Buffer> = []
    let isFirstFragment = true
    
    try {
      for await (const box of generator) {
        const { header, type, data } = box
        pending.push(header, data)

        if (isFirstFragment) {
          if (type === 'moov') {
            const fragment = Buffer.concat(pending)
            pending = []
            isFirstFragment = false
            this.log.debug(`HKSV: Sending initialization segment, size: ${fragment.length}`, this.cameraName)
            yield fragment
          }
        } else {
          if (type === 'moof') {
            moofBuffer = Buffer.concat([header, data])
          } else if (type === 'mdat' && moofBuffer) {
            const fragment = Buffer.concat([moofBuffer, header, data])
            fragmentCount++
            this.log.debug(`HKSV: Fragment ${fragmentCount}, size: ${fragment.length}`, this.cameraName)
            yield fragment
            moofBuffer = null
          }
        }
      }
    } catch (e) {
      this.log.debug(`Recording completed: ${e}`, this.cameraName)
    } finally {
      // Fast cleanup
      if (cp && !cp.killed) {
        cp.kill('SIGTERM')
        setTimeout(() => cp.killed || cp.kill('SIGKILL'), 2000)
      }
      this.activeFFmpegProcesses.delete(streamId)
    }
  }

  private startFFMPegFragmetedMP4Session(ffmpegPath: string, ffmpegInput: string[], videoOutputArgs: string[]): Promise<{
    generator: AsyncIterable<{ header: Buffer; length: number; type: string; data: Buffer }>;
    cp: import('node:child_process').ChildProcess;
  }> {
    return new Promise((resolve, reject) => {
      const args: string[] = ['-hide_banner', ...ffmpegInput]
      
      // Add dummy audio for HKSV compatibility if needed
      if (this.videoConfig?.audio === false) {
        args.push(
          '-f', 'lavfi', '-i', 'anullsrc=cl=mono:r=32000',
        )
      }

      args.push(
        '-f', 'mp4',
        ...videoOutputArgs,
        '-movflags', 'frag_keyframe+empty_moov+default_base_moof+omit_tfhd_offset',
        'pipe:1'
      )
      
      // Terminate any previous process quickly
      if (this.process && !this.process.killed) {
        this.process.kill('SIGKILL')
      }
      
      this.process = spawn(ffmpegPath, args, { 
        env, 
        stdio: ['pipe', 'pipe', 'pipe']
      })
      
      const cp = this.process
      let processKilledIntentionally = false
      
      // Optimized MP4 generator
      async function* generator() {
        if (!cp.stdout) throw new Error('FFmpeg stdout unavailable')
        
        while (true) {
          try {
            const header = await readLength(cp.stdout, 8)
            const length = header.readInt32BE(0) - 8
            const type = header.slice(4).toString()
            
            if (length < 0 || length > 50 * 1024 * 1024) { // Max 50MB
              throw new Error(`Invalid MP4 box: ${length}B for ${type}`)
            }
            
            const data = await readLength(cp.stdout, length)
            yield { header, length, type, data }
          } catch (error) {
            if (!processKilledIntentionally) throw error
            break
          }
        }
      }
      
      // Minimal stderr handling
      if (cp.stderr) {
        cp.stderr.on('data', (data) => {
          const output = data.toString()
          if (output.includes('error') || output.includes('Error')) {
            this.log.error(`FFmpeg: ${output.trim()}`, this.cameraName)
          }
        })
      }
      
      cp.on('spawn', () => {
        resolve({ generator: generator(), cp })
      })

      cp.on('error', reject)
      
      cp.on('exit', (code, signal) => {
        if (code !== 0 && !processKilledIntentionally && code !== 255) {
          this.log.warn(`FFmpeg exited with code ${code}`, this.cameraName)
        }
        
        // Enhanced process cleanup and error handling
        cp.on('exit', (code, signal) => {
          this.log.debug(`DEBUG: FFmpeg process ${cp.pid} exited with code ${code}, signal ${signal}`, this.cameraName)
          if (code !== 0 && code !== null) {
            this.log.warn(`HKSV: FFmpeg exited with non-zero code ${code}, this may indicate stream issues`, this.cameraName)
          }
        })
        
        cp.on('error', (error) => {
          this.log.error(`DEBUG: FFmpeg process error: ${error}`, this.cameraName)
        })
      })
      
      // Fast cleanup
      const cleanup = () => {
        processKilledIntentionally = true
        if (cp && !cp.killed) {
          cp.kill('SIGTERM')
          setTimeout(() => cp.killed || cp.kill('SIGKILL'), 2000)
        }
      }
      
      ;(cp as any).cleanup = cleanup
    })
  }
}
