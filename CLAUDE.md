# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Homebridge plugin that provides FFmpeg-based camera support for Apple HomeKit. It enables IP cameras to be integrated into HomeKit with support for video streaming, snapshots, motion detection, doorbell functionality, and HomeKit Secure Video recording.

## Development Commands

### Essential Commands
- `npm run build` - Compile TypeScript to JavaScript (outputs to `dist/`)
- `npm run lint` - Run ESLint on source files
- `npm run lint:fix` - Auto-fix linting issues
- `npm test` - Run all tests with Vitest
- `npm run test:watch` - Run tests in watch mode
- `npm run test-coverage` - Run tests with coverage report
- `npm run clean` - Remove the dist folder

### Development Workflow
- `npm run watch` - Build, copy plugin UI files, link locally, and watch for changes with nodemon
- `npm run plugin-ui` - Copy Homebridge UI files from `src/homebridge-ui/public/` to `dist/homebridge-ui/public/`

### Note on Testing
The project uses Vitest for testing. Test files are excluded from the TypeScript compilation (see `tsconfig.json`).

## Architecture Overview

### Core Components

**Platform (platform.ts)**
- Entry point that registers with Homebridge as a dynamic platform plugin
- Manages camera accessories lifecycle (creation, configuration, caching)
- Handles automation integrations (MQTT client, HTTP server)
- Routes motion/doorbell events to appropriate handlers
- Maintains timers for motion/doorbell resets

**Streaming Delegate (streamingDelegate.ts)**
- Implements HomeKit camera streaming protocol
- Manages video/audio RTP streams via FFmpeg
- Handles snapshot requests (supports both HTTP URLs and FFmpeg extraction)
- Coordinates session management (pending, ongoing, timeouts)
- Creates and manages the recording delegate if HSV is enabled

**Recording Delegate (recordingDelegate.ts)**
- Implements HomeKit Secure Video (HSV) recording
- Generates fragmented MP4 streams with proper H.264 profiles/levels
- Handles recording configuration updates from HomeKit
- Works with prebuffering to capture pre-motion video
- Uses async generators to yield MP4 fragments (ftyp, moov, moof, mdat boxes)

**PreBuffer (prebuffer.ts)**
- Maintains a rolling buffer of recent video for HSV
- Runs a persistent FFmpeg process that outputs fragmented MP4
- Stores atoms with timestamps for time-based retrieval
- Provides video segments on-demand when recording is triggered

**FFmpeg Process (ffmpeg.ts)**
- Wrapper around FFmpeg child processes
- Parses progress output for monitoring
- Handles process lifecycle (start, stop, error handling)
- Supports motion detection via scene change analysis
- Logs performance metrics and errors

### Data Flow

1. **Live Streaming**: HomeKit → StreamingDelegate → FFmpeg → RTP/SRTP stream
2. **Snapshots**: HomeKit → StreamingDelegate → FFmpeg (or direct HTTP fetch) → JPEG
3. **HSV Recording**: Motion event → RecordingDelegate → PreBuffer → FFmpeg → MP4 fragments → HomeKit
4. **Motion Detection**: FFmpeg scene filter → FfmpegProcess callback → Platform motion handler
5. **Automation**: MQTT/HTTP → Platform handlers → Update HomeKit characteristics

### Key Design Patterns

- **Delegate Pattern**: Streaming and recording delegates implement HomeKit protocols
- **Session Management**: Maps track active streaming/recording sessions by session ID
- **Async Generators**: Used for streaming MP4 atoms from FFmpeg output
- **Event-based**: PreBuffer uses EventEmitter to notify consumers of new video atoms

## Important Configuration Details

### Camera Configuration Structure
Cameras are configured in the platform config with these key sections:
- `videoConfig.source` - FFmpeg input arguments (required, must include `-i`)
- `videoConfig.subSource` - Lower resolution stream for motion detection
- `videoConfig.stillImageSource` - Direct URL or FFmpeg source for snapshots
  - HTTP/HTTPS URLs: `"http://camera.local/snapshot.jpg"` (no `-i` needed)
  - FFmpeg sources: `"-i rtsp://camera.local:554/stream"` (requires `-i`)
- `videoConfig.recording` - Enables HomeKit Secure Video
- `videoConfig.prebuffer` - Enables video prebuffering for HSV (requires recording)

### Configuration Validation
The plugin validates camera configurations at startup (platform.ts constructor):
- Checks for required fields (name, source)
- Validates FFmpeg arguments include `-i` flag
- **Intelligently skips `-i` validation** for direct HTTP/HTTPS URLs in `stillImageSource`
- Uses the same URL detection regex as snapshot fetching (`/^https?:\/\/[^\s]+$/`)

### FFmpeg Path Resolution
The plugin uses this hierarchy for finding FFmpeg:
1. `videoProcessor` from platform or camera config
2. `defaultFfmpegPath` from `@homebridge/camera-utils` package
3. System `ffmpeg` command

### TypeScript Configuration
- Target: ES2022 with ES Modules (`"type": "module"` in package.json)
- Module resolution: bundler mode
- Strict mode enabled, but `noImplicitAny` is disabled
- Source maps and declarations generated

## Working with This Codebase

### Adding Features
- Camera features require updates to: settings.ts (types), config.schema.json (UI), platform.ts or streamingDelegate.ts (logic)
- HSV features primarily live in recordingDelegate.ts and prebuffer.ts
- Motion/doorbell automation touches platform.ts event handlers and ffmpeg.ts for detection

### Snapshot Fetching
The plugin intelligently chooses between two methods for fetching snapshots:

**Direct HTTP/HTTPS Fetch** (streamingDelegate.ts:fetchSnapshot)
- Used when `stillImageSource` is a plain URL (matches `/^https?:\/\/[^\s]+$/`)
- Fetches images directly using Node's native `http`/`https` modules
- Much faster than FFmpeg (no process spawn overhead)
- 10-second timeout with proper error handling
- Example: `"stillImageSource": "http://192.168.1.100/snapshot.jpg"`

**FFmpeg-based Fetch**
- Used for RTSP streams or FFmpeg-style arguments
- Required when video filters need to be applied
- Handles complex sources that require decoding
- Example: `"stillImageSource": "-i rtsp://192.168.1.100:554/stream"`

The detection is automatic and transparent to the user.

### FFmpeg Integration
- All FFmpeg commands are split by whitespace and passed as argv arrays
- Debug logging can be enabled per-camera via `videoConfig.debug`
- FFmpeg processes output progress to stdout and logs to stderr
- Scene-based motion detection uses the `select` filter with metadata output

### Session Management
Sessions have distinct lifecycle stages:
- Pending: Created during prepareStream, stores crypto/network info
- Ongoing: Active after startStream, contains FFmpeg processes and sockets
- Cleanup: Happens on stopStream or controller.forceStopStreamingSession

### Common Patterns
- All camera names are required; the platform generates defaults if missing
- UUID generation uses `api.hap.uuid.generate(cameraName)` for consistency
- Services are removed and recreated on configuration changes (not updated in-place)
- Accessories are published as external (unbridged by default) via `publishExternalAccessories`
