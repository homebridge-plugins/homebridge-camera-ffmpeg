import type { ChildProcess } from 'node:child_process'
import type { Server } from 'node:net'

import type { Logger } from './logger.js'
import type { MP4Atom } from './settings.js'

import { spawn } from 'node:child_process'
import { createServer } from 'node:net'

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { PreBuffer } from './prebuffer.js'
import { listenServer } from './recordingDelegate.js'

interface MockServer {
  close: ReturnType<typeof vi.fn>
  connect: (socket: MockSocket) => Promise<void>
}

interface MockSocket {
  atoms: Array<MP4Atom>
}

const mocks = vi.hoisted(() => ({
  deferListen: false,
  nextPort: 12000,
  processes: [] as Array<ChildProcess>,
  resolveListen: undefined as (() => void) | undefined,
  servers: [] as Array<MockServer>,
}))

vi.mock('node:child_process', () => ({
  spawn: vi.fn(() => {
    const process = {
      kill: vi.fn(),
      stderr: undefined,
      stdout: undefined,
    } as unknown as ChildProcess
    mocks.processes.push(process)
    return process
  }),
}))

vi.mock('node:net', () => ({
  createServer: vi.fn((connectionListener: (socket: MockSocket) => Promise<void>) => {
    const server = {
      close: vi.fn(),
      connect: connectionListener,
    }
    mocks.servers.push(server)
    return server
  }),
}))

vi.mock('./recordingDelegate.js', () => ({
  listenServer: vi.fn(async () => {
    if (mocks.deferListen) {
      await new Promise<void>((resolve) => {
        mocks.resolveListen = resolve
      })
    }
    return mocks.nextPort++
  }),
  parseFragmentedMP4: vi.fn((socket: MockSocket) => (async function* () {
    yield* socket.atoms
  })()),
}))

function createLogger(): Logger {
  return {
    debug: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    success: vi.fn(),
    warn: vi.fn(),
  } as unknown as Logger
}

function atom(type: string, data: string): MP4Atom {
  return {
    data: Buffer.from(data),
    header: Buffer.alloc(8),
    length: data.length,
    type,
  }
}

describe('PreBuffer', () => {
  beforeEach(() => {
    mocks.deferListen = false
    mocks.nextPort = 12000
    mocks.processes.length = 0
    mocks.resolveListen = undefined
    mocks.servers.length = 0
    vi.clearAllMocks()
  })

  it('deduplicates concurrent starts for one camera', async () => {
    const preBuffer = new PreBuffer(
      createLogger(),
      '-i rtsp://user:credential@camera/private/stream',
      'Camera A',
      '/opt/private/ffmpeg',
    )

    const [firstSession, secondSession] = await Promise.all([
      preBuffer.startPreBuffer(),
      preBuffer.startPreBuffer(),
    ])

    expect(firstSession).toBe(secondSession)
    expect(listenServer).toHaveBeenCalledTimes(1)
    expect(createServer).toHaveBeenCalledTimes(1)
    expect(spawn).toHaveBeenCalledTimes(1)
  })

  it('does not leak a process when stopped during an in-flight start', async () => {
    mocks.deferListen = true
    const preBuffer = new PreBuffer(
      createLogger(),
      '-i rtsp://user:credential@camera/private/stream',
      'Camera A',
      '/opt/private/ffmpeg',
    )

    const start = preBuffer.startPreBuffer()
    preBuffer.stopPreBuffer()
    mocks.resolveListen?.()

    await expect(start).rejects.toThrow('Prebuffer start cancelled')
    expect(spawn).not.toHaveBeenCalled()
    expect(mocks.servers[0].close).toHaveBeenCalledOnce()

    mocks.deferListen = false
    const restartedSession = await preBuffer.startPreBuffer()
    expect(restartedSession.process).toBe(mocks.processes[0])
    expect(spawn).toHaveBeenCalledOnce()
  })

  it('isolates processes, ports, arguments, buffers, and logs between cameras', async () => {
    const cameraALog = createLogger()
    const cameraBLog = createLogger()
    const cameraA = new PreBuffer(
      cameraALog,
      '-i rtsp://alice:credential-a@camera-a/private/a',
      'Camera A',
      '/opt/private/ffmpeg-a',
    )
    const cameraB = new PreBuffer(
      cameraBLog,
      '-i rtsp://bob:credential-b@camera-b/private/b',
      'Camera B',
      '/opt/private/ffmpeg-b',
    )

    const [sessionA, sessionB] = await Promise.all([
      cameraA.startPreBuffer(),
      cameraB.startPreBuffer(),
    ])

    expect(sessionA).not.toBe(sessionB)
    expect(sessionA.process).not.toBe(sessionB.process)
    expect(sessionA.server).not.toBe(sessionB.server)

    const [cameraACall, cameraBCall] = vi.mocked(spawn).mock.calls
    const cameraAArgs = cameraACall[1]
    const cameraBArgs = cameraBCall[1]

    expect(cameraACall[0]).toBe('/opt/private/ffmpeg-a')
    expect(cameraBCall[0]).toBe('/opt/private/ffmpeg-b')
    expect(cameraAArgs).toContain('rtsp://alice:credential-a@camera-a/private/a')
    expect(cameraBArgs).toContain('rtsp://bob:credential-b@camera-b/private/b')
    expect(cameraAArgs).toContain('tcp://127.0.0.1:12000')
    expect(cameraBArgs).toContain('tcp://127.0.0.1:12001')
    expect(cameraAArgs).not.toContain('rtsp://bob:credential-b@camera-b/private/b')
    expect(cameraBArgs).not.toContain('rtsp://alice:credential-a@camera-a/private/a')

    await (sessionA.server as unknown as MockServer).connect({
      atoms: [atom('ftyp', 'a-ftyp'), atom('moov', 'a-moov'), atom('moof', 'a-moof'), atom('mdat', 'a-mdat')],
    })
    await (sessionB.server as unknown as MockServer).connect({
      atoms: [atom('ftyp', 'b-ftyp'), atom('moov', 'b-moov'), atom('moof', 'b-moof'), atom('mdat', 'b-mdat')],
    })

    expect(cameraA.ftyp.data.toString()).toBe('a-ftyp')
    expect(cameraB.ftyp.data.toString()).toBe('b-ftyp')
    expect(cameraA.prebufferFmp4.map(fragment => fragment.atom.data.toString())).toEqual(['a-moof', 'a-mdat'])
    expect(cameraB.prebufferFmp4.map(fragment => fragment.atom.data.toString())).toEqual(['b-moof', 'b-mdat'])

    const logOutput = JSON.stringify([
      ...Object.values(cameraALog).flatMap(method => vi.isMockFunction(method) ? method.mock.calls : []),
      ...Object.values(cameraBLog).flatMap(method => vi.isMockFunction(method) ? method.mock.calls : []),
    ])
    expect(logOutput).not.toContain('alice')
    expect(logOutput).not.toContain('bob')
    expect(logOutput).not.toContain('credential-a')
    expect(logOutput).not.toContain('credential-b')
    expect(logOutput).not.toContain('/private/a')
    expect(logOutput).not.toContain('/private/b')
    expect(logOutput).not.toContain('/opt/private/ffmpeg-a')
    expect(logOutput).not.toContain('/opt/private/ffmpeg-b')
  })
})
