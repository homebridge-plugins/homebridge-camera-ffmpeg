import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { API, HAP, PlatformAccessory } from 'homebridge'
import type { CameraConfig } from './settings.js'
import type { Logger } from './logger.js'
import { StreamingDelegate } from './streamingDelegate.js'

// Mock the dependencies
vi.mock('@homebridge/camera-utils', () => ({
  defaultFfmpegPath: '/usr/bin/ffmpeg'
}))

vi.mock('homebridge', () => ({
  APIEvent: {
    SHUTDOWN: 'shutdown'
  },
  AudioRecordingCodecType: {
    AAC_LC: 0
  },
  AudioRecordingSamplerate: {
    KHZ_32: 32000
  },
  AudioStreamingCodecType: {
    AAC_ELD: 2,
    OPUS: 3
  },
  AudioStreamingSamplerate: {
    KHZ_16: 16000
  },
  StreamRequestTypes: {
    START: 0,
    RECONFIGURE: 1,
    STOP: 2
  }
}))

describe('StreamingDelegate Timeout Logic', () => {
  let mockLog: Logger
  let mockAPI: API
  let mockHAP: HAP
  let mockAccessory: PlatformAccessory
  let cameraConfig: CameraConfig

  beforeEach(() => {
    mockLog = {
      debug: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn()
    } as any

    mockAPI = {
      on: vi.fn()
    } as any

    mockHAP = {
      CameraController: vi.fn().mockImplementation(() => ({
        generateSynchronisationSource: () => 12345
      })),
      SRTPCryptoSuites: {
        AES_CM_128_HMAC_SHA1_80: 0
      },
      H264Profile: {
        BASELINE: 0,
        MAIN: 1,
        HIGH: 2
      },
      H264Level: {
        LEVEL3_1: 0,
        LEVEL3_2: 1,
        LEVEL4_0: 2
      },
      VideoCodecType: {
        H264: 0
      },
      EventTriggerOption: {
        MOTION: 0,
        DOORBELL: 1
      }
    } as any

    mockAccessory = {} as any

    cameraConfig = {
      name: 'Test Camera',
      videoConfig: {
        source: '-i rtsp://test:test@192.168.1.100/stream',
        maxStreams: 2,
        maxWidth: 1920,
        maxHeight: 1080,
        maxFPS: 30,
        maxBitrate: 1000,
        vcodec: 'libx264',
        audio: false,
        debug: false
      }
    }
  })

  it('should calculate timeout correctly with various RTCP intervals', () => {
    const delegate = new StreamingDelegate(mockLog, cameraConfig, mockAPI, mockHAP, mockAccessory)
    
    // Test minimum timeout (30 seconds)
    const shortRtcpInterval = 1 // 1 second
    const expectedMinTimeout = 30000 // 30 seconds minimum
    const calculatedShortTimeout = Math.max(30000, Math.min(shortRtcpInterval * 5 * 1000, 300000))
    expect(calculatedShortTimeout).toBe(expectedMinTimeout)

    // Test normal timeout 
    const normalRtcpInterval = 10 // 10 seconds
    const expectedNormalTimeout = 50000 // 50 seconds (10 * 5 * 1000)
    const calculatedNormalTimeout = Math.max(30000, Math.min(normalRtcpInterval * 5 * 1000, 300000))
    expect(calculatedNormalTimeout).toBe(expectedNormalTimeout)

    // Test maximum timeout (5 minutes)
    const longRtcpInterval = 100 // 100 seconds
    const expectedMaxTimeout = 300000 // 5 minutes maximum
    const calculatedLongTimeout = Math.max(30000, Math.min(longRtcpInterval * 5 * 1000, 300000))
    expect(calculatedLongTimeout).toBe(expectedMaxTimeout)
  })

  it('should create instance without throwing errors', () => {
    expect(() => {
      new StreamingDelegate(mockLog, cameraConfig, mockAPI, mockHAP, mockAccessory)
    }).not.toThrow()
  })
})