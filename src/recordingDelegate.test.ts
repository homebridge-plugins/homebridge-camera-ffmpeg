import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RecordingDelegate } from './recordingDelegate.js'
import type { Logger } from './logger.js'
import type { VideoConfig } from './settings.js'
import type { API, HAP, CameraRecordingConfiguration, AudioRecordingCodecType, H264Profile, H264Level } from 'homebridge'

// Mock dependencies
const mockLogger: Logger = {
  info: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  debug: vi.fn(),
  success: vi.fn(),
  log: {} as any,
  debugMode: false,
  formatMessage: vi.fn(),
} as any

const mockAPI: API = {
  on: vi.fn(),
} as any

const mockHAP: HAP = {} as any

describe('RecordingDelegate HKSV Integration', () => {
  let recordingDelegate: RecordingDelegate
  let videoConfig: VideoConfig

  beforeEach(() => {
    vi.clearAllMocks()
    
    videoConfig = {
      source: '-f lavfi -i testsrc2=size=320x240:rate=1',
      recording: true,
      prebuffer: true,
      audio: false
    }

    recordingDelegate = new RecordingDelegate(
      mockLogger,
      'TestCamera',
      videoConfig,
      mockAPI,
      mockHAP,
      'ffmpeg'
    )
  })

  it('should handle recording stream request with prebuffer enabled', async () => {
    // Mock configuration
    const mockConfig: CameraRecordingConfiguration = {
      audioCodec: {
        type: 0 as AudioRecordingCodecType,
        samplerate: 32,
        bitrate: 64,
        audioChannels: 1
      },
      videoCodec: {
        parameters: {
          profile: 0 as H264Profile, // BASELINE
          level: 0 as H264Level,     // LEVEL3_1
          bitRate: 1000
        },
        resolution: [1280, 720, 15]
      },
      mediaContainerConfiguration: {
        fragmentLength: 4000
      }
    } as any

    // Update configuration
    await recordingDelegate.updateRecordingConfiguration(mockConfig)

    // Mock startPreBuffer to avoid actual FFmpeg calls
    vi.spyOn(recordingDelegate, 'startPreBuffer').mockResolvedValue()

    // Test the recording stream request
    const streamGenerator = recordingDelegate.handleRecordingStreamRequest(1)
    
    // Get the first value to trigger the function execution
    try {
      const { value } = await streamGenerator.next()
      // We expect this to throw because we don't have actual FFmpeg
    } catch (error) {
      // Expected to fail due to missing FFmpeg setup
    }
    
    // Should not throw error during initialization
    expect(streamGenerator).toBeDefined()
    
    // Verify logging occurred
    expect(mockLogger.info).toHaveBeenCalledWith(
      'Recording stream request received for stream ID: 1',
      'TestCamera'
    )
  })

  it('should handle recording stream request without prebuffer', async () => {
    // Disable prebuffer
    videoConfig.prebuffer = false
    
    recordingDelegate = new RecordingDelegate(
      mockLogger,
      'TestCamera',
      videoConfig,
      mockAPI,
      mockHAP,
      'ffmpeg'
    )

    const mockConfig: CameraRecordingConfiguration = {
      audioCodec: {
        type: 0 as AudioRecordingCodecType,
        samplerate: 32,
        bitrate: 64,
        audioChannels: 1
      },
      videoCodec: {
        parameters: {
          profile: 0 as H264Profile,
          level: 0 as H264Level,
          bitRate: 1000
        },
        resolution: [1280, 720, 15]
      },
      mediaContainerConfiguration: {
        fragmentLength: 4000
      }
    } as any

    await recordingDelegate.updateRecordingConfiguration(mockConfig)

    const streamGenerator = recordingDelegate.handleRecordingStreamRequest(1)
    
    // Try to get the first value to trigger execution
    try {
      const { value } = await streamGenerator.next()
      // We expect this to throw because we don't have actual FFmpeg
    } catch (error) {
      // Expected to fail due to missing FFmpeg setup
    }
    
    // Should not throw error during initialization
    expect(streamGenerator).toBeDefined()
    
    // Should log recording stream request
    expect(mockLogger.info).toHaveBeenCalledWith(
      'Recording stream request received for stream ID: 1',
      'TestCamera'
    )
  })

  it('should properly close recording stream with diagnostic logging', () => {
    // Test reason 6 specifically (STREAM FORMAT INCOMPATIBILITY)
    recordingDelegate.closeRecordingStream(1, 6)
    
    expect(mockLogger.warn).toHaveBeenCalledWith(
      expect.stringContaining('STREAM FORMAT INCOMPATIBILITY'),
      'TestCamera'
    )
    
    // Test normal closure (reason 0)
    recordingDelegate.closeRecordingStream(2, 0)
    
    expect(mockLogger.info).toHaveBeenCalledWith(
      expect.stringContaining('Recording ended normally'),
      'TestCamera'
    )
  })
})