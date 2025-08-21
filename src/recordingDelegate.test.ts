import { describe, expect, it, vi } from 'vitest'
import type { API, CameraRecordingConfiguration, HAP } from 'homebridge'
import { AudioRecordingCodecType, H264Level, H264Profile } from 'homebridge'

import { RecordingDelegate } from './recordingDelegate.js'
import type { VideoConfig } from './settings.js'
import type { Logger } from './logger.js'

describe('RecordingDelegate', () => {
  const mockLogger: Logger = {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
  }

  const mockAPI: Partial<API> = {
    on: vi.fn(),
  }

  const mockHAP: Partial<HAP> = {}

  const mockVideoConfig: VideoConfig = {
    source: 'test-source',
    recording: true,
    prebuffer: true,
  }

  const mockRecordingConfiguration: CameraRecordingConfiguration = {
    mediaContainerConfiguration: {
      type: 0,
      fragmentLength: 4000,
    },
    videoCodec: {
      type: 0,
      parameters: {
        level: H264Level.LEVEL3_1,
        profile: H264Profile.BASELINE,
        bitRate: 1000,
        iFrameInterval: 4,
      },
      resolution: [1920, 1080, 30],
    },
    audioCodec: {
      type: AudioRecordingCodecType.AAC_LC,
      samplerate: 32,
      bitrate: 32,
      audioChannels: 1,
    },
  }

  it('should accept recording configuration', () => {
    const delegate = new RecordingDelegate(
      mockLogger,
      'test-camera',
      mockVideoConfig,
      mockAPI as API,
      mockHAP as HAP,
    )

    // Should not throw when updating configuration
    expect(() => {
      delegate.updateRecordingConfiguration(mockRecordingConfiguration)
    }).not.toThrow()

    expect(() => {
      delegate.updateRecordingConfiguration(undefined)
    }).not.toThrow()
  })

  it('should handle recording stream request with proper configuration', async () => {
    const delegate = new RecordingDelegate(
      mockLogger,
      'test-camera',
      mockVideoConfig,
      mockAPI as API,
      mockHAP as HAP,
    )

    delegate.updateRecordingConfiguration(mockRecordingConfiguration)

    // Mock the handleFragmentsRequests method to return test data
    const testBuffer = Buffer.from('test-fragment-data')
    vi.spyOn(delegate, 'handleFragmentsRequests').mockImplementation(async function* () {
      yield testBuffer
    })

    const generator = delegate.handleRecordingStreamRequest(1)
    const firstPacket = await generator.next()

    expect(firstPacket.done).toBe(false)
    expect(firstPacket.value).toHaveProperty('data')
    expect(firstPacket.value).toHaveProperty('isLast')
    expect(firstPacket.value.data).toEqual(testBuffer)
    expect(firstPacket.value.isLast).toBe(false)

    // Continue until end
    let packet = await generator.next()
    while (!packet.done && !packet.value.isLast) {
      packet = await generator.next()
    }

    // Should end with isLast=true
    expect(packet.value.isLast).toBe(true)
  })

  it('should handle recording stream request without configuration', async () => {
    const delegate = new RecordingDelegate(
      mockLogger,
      'test-camera',
      mockVideoConfig,
      mockAPI as API,
      mockHAP as HAP,
    )

    // No configuration set
    const generator = delegate.handleRecordingStreamRequest(1)
    const result = await generator.next()

    expect(result.done).toBe(true)
    expect(mockLogger.error).toHaveBeenCalledWith(
      'No recording configuration available',
      'test-camera',
    )
  })
})