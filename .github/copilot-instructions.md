# Homebridge Camera FFmpeg Development Guide

Homebridge Camera FFmpeg is a TypeScript-based plugin that provides FFmpeg-based camera support for the Homebridge ecosystem. This plugin supports both Homebridge and HOOBS platforms, includes a custom configuration UI, and provides MQTT/HTTP automation features.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Initial Setup
Run these commands in sequence to set up the development environment:

```bash
# Install FFmpeg (required for camera functionality)
sudo apt update && sudo apt install -y ffmpeg

# Install dependencies (IMPORTANT: Use npm ci to respect package-lock.json)
npm ci  # Takes ~35 seconds. NEVER CANCEL. Use npm ci (not npm install) to maintain version consistency.

# Build the project
npm run build  # Takes ~5 seconds. NEVER CANCEL. Set timeout to 30+ seconds.

# Run tests to verify setup
npm run test  # Takes ~1.3 seconds. NEVER CANCEL. Set timeout to 30+ seconds.

# Verify linting
npm run lint  # Takes ~2.4 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
```

**CRITICAL**: Always use `npm ci` (not `npm install`) for dependency installation to maintain exact version compatibility defined in package-lock.json. Using `npm install` may upgrade dependencies and cause ESLint configuration conflicts.

### Development Workflow
- Build: `npm run build` -- Compiles TypeScript and copies UI files. Takes ~5 seconds.
- Test: `npm run test` -- Runs vitest test suite. Takes ~1.3 seconds.
- Test Coverage: `npm run test-coverage` -- Runs tests with coverage report. Takes ~2 seconds.
- Test Watch: `npm run test:watch` -- Runs tests in watch mode for development.
- Lint: `npm run lint` -- Runs eslint. Takes ~2.4 seconds.
- Lint Fix: `npm run lint:fix` -- Auto-fixes linting issues. Takes ~2-3 seconds.
- Clean: `npm run clean` -- Removes dist/ directory. Takes <1 second.
- Check: `npm run check` -- Checks for outdated dependencies. Takes ~10 seconds.
- Watch: `npm run watch` -- Development mode with nodemon and homebridge.

### Plugin Testing and Validation
To test the plugin locally with Homebridge:

```bash
# Install Homebridge globally
npm install -g homebridge

# Link the plugin locally
npm link

# Create a test configuration in /tmp/homebridge-test-config.json
# Then run Homebridge with the plugin
HOMEBRIDGE_CONFIG_DIR=/tmp homebridge -C /tmp/homebridge-test-config.json -D
```

The plugin should load successfully and display "Loaded plugin: @homebridge-plugins/homebridge-camera-ffmpeg@4.0.1".

## Validation

### CRITICAL Build and Test Requirements
- **NEVER CANCEL** any build, test, or lint commands. They complete quickly but require appropriate timeouts.
- **ALWAYS** run `npm run lint:fix` before committing changes or the CI (.github/workflows/build.yml) will fail.
- **ALWAYS** run the complete workflow after making changes:
  1. `npm run build` (5 seconds)
  2. `npm run test` (1.3 seconds) 
  3. `npm run lint` (2.4 seconds)
- **Test Coverage**: Current coverage is ~5% (low due to limited functional tests). This is normal for camera plugins.
- **Outdated Dependencies**: Running `npm run check` will show outdated packages. This is normal and expected.

### Manual Functional Testing Scenarios
Always test these scenarios after making significant changes:

1. **Plugin Loading Test**: Verify the plugin loads in Homebridge without errors
   ```bash
   HOMEBRIDGE_CONFIG_DIR=/tmp homebridge -C /tmp/test-config.json -D
   ```

2. **Configuration Validation**: Test that the config schema validates properly
   ```bash
   node -e "const config = require('./dist/index.js'); console.log('✓ Plugin exports:', typeof config.default);"
   ```

3. **Camera Configuration**: Create a minimal camera configuration and verify it's accepted
   ```json
   {
     "platform": "Camera-ffmpeg",
     "cameras": [{
       "name": "Test Camera",
       "videoConfig": {
         "source": "-f lavfi -i testsrc2=size=320x240:rate=1",
         "maxStreams": 1,
         "audio": false
       }
     }]
   }
   ```

4. **UI Component**: If changing UI components, verify the custom UI in src/homebridge-ui/ works

### Testing Camera Functionality
While full camera testing requires actual RTSP streams, you can validate basic functionality:

```bash
# Test FFmpeg is available and working
ffmpeg -version

# Test FFmpeg with synthetic test source (validates camera pipeline)
ffmpeg -f lavfi -i testsrc2=size=320x240:rate=1 -t 2 -y /tmp/test_output.mp4

# Verify plugin can be imported and configured
node -e "console.log(require('./dist/index.js'))"

# Test complete development workflow
npm run clean && npm run build && npm run test && npm run lint
```

**Expected Results:**
- FFmpeg should be version 6.1.1+ with H.264 support
- Synthetic test source should create a valid MP4 file
- Plugin should export a function 
- All commands should complete in under 10 seconds total

## Common Tasks

### Repository Structure
```
├── src/                    # TypeScript source code
│   ├── homebridge-ui/      # Custom Homebridge UI components
│   │   ├── public/         # Static UI files
│   │   └── server.ts       # UI server logic
│   ├── *.ts               # Main plugin source files
│   └── *.test.ts          # Test files (co-located with source)
├── dist/                  # Compiled output (generated)
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── config.schema.json     # Plugin configuration schema
├── eslint.config.js       # Linting configuration
└── .github/workflows/     # CI/CD pipelines
```

### Key Source Files
- `src/index.ts` - Plugin entry point and registration
- `src/platform.ts` - Main platform implementation
- `src/settings.ts` - Configuration interfaces and constants
- `src/streamingDelegate.ts` - Camera streaming logic
- `src/ffmpeg.ts` - FFmpeg integration
- `src/homebridge-ui/server.ts` - Custom UI server

### Dependencies and Requirements
- **Node.js**: v20+ or v22+ (current: v20.19.4)
- **FFmpeg**: Required for camera functionality - install via `sudo apt install -y ffmpeg`
- **Homebridge**: v1.9.0+ or v2.0.0+ for testing
- **TypeScript**: For compilation
- **vitest**: For testing
- **eslint**: For code quality

### Configuration Schema
The plugin uses `config.schema.json` to define its configuration interface in Homebridge/HOOBS UIs. Key configuration sections:
- Platform settings (MQTT, HTTP automation)
- Camera configurations (video sources, encoding options)
- Optional parameters (motion detection, doorbell, etc.)

### Plugin Packaging
- Built as an npm package: `@homebridge-plugins/homebridge-camera-ffmpeg`
- Uses ES2022 modules (`"type": "module"` in package.json)
- Includes custom UI at `./dist/homebridge-ui`
- Main entry point: `dist/index.js`

### NPM Scripts Reference
All scripts from package.json with validated timing:
- `npm run build` - Full build process (5s)
- `npm run test` - Run test suite (1.3s)  
- `npm run test:watch` - Interactive test watching
- `npm run test-coverage` - Coverage report (2s)
- `npm run lint` - Code linting (2.4s)
- `npm run lint:fix` - Auto-fix linting issues (2-3s)
- `npm run clean` - Remove dist/ folder (<1s)
- `npm run check` - Check outdated dependencies (10s)
- `npm run watch` - Development mode with Homebridge
- `npm run plugin-ui` - Copy UI files to dist/

### Common Development Pitfalls
- **FFmpeg Missing**: The plugin requires FFmpeg to be installed separately
- **Package Lock File**: ALWAYS use `npm ci` (not `npm install`) to maintain version consistency
- **ESLint Version Conflicts**: Using `npm install` may update @antfu/eslint-config causing rule conflicts
- **Plugin Linking**: Use `npm link` for local development testing
- **TypeScript Compilation**: Always run `npm run build` after source changes
- **Scoped Package**: Plugin name is scoped under `@homebridge-plugins/`
- **Unbridged by Default**: v4.0+ forces all cameras to be unbridged accessories

### CI/CD Pipeline
The build pipeline (`.github/workflows/build.yml`) runs:
1. Node.js build and test using shared Homebridge workflows
2. ESLint validation

Ensure all local validation passes before pushing changes.

### MQTT and HTTP Features
The plugin supports automation via:
- **MQTT**: Connect to external MQTT brokers for motion/doorbell triggers
- **HTTP**: RESTful API for triggering events
- **Switches**: HomeKit switches for manual triggering

### Tested Configuration Management
The repository maintains a collection of tested camera configurations submitted by users via GitHub issues labeled "tested config". These configurations are displayed on the project documentation website at https://sunoo.github.io/homebridge-camera-ffmpeg/configs/.

#### Processing Tested Config Issues
When working with issues that have the "tested config" label:

1. **Identify Tested Config Issues**: Look for issues created using the `.github/ISSUE_TEMPLATE/tested_config.md` template with the "tested config" label.

2. **Extract Configuration Data**: These issues contain:
   - **Manufacturer/Model**: Camera brand and model information
   - **Homebridge Config**: Working JSON configuration for the camera
   - **Additional Information**: Setup notes, troubleshooting tips, or special requirements

3. **Validate Configuration**: Ensure the submitted configuration:
   - Uses proper JSON syntax
   - Contains required fields (`platform`, `cameras` array with `name` and `videoConfig.source`)
   - Follows the plugin's configuration schema defined in `config.schema.json`
   - Removes sensitive information (passwords, tokens, IP addresses should be sanitized)

4. **Documentation Integration**: Tested configurations should be added to the project documentation website. The configurations are referenced in:
   - `README.md` line 18: Links to the configs page
   - `config.schema.json`: Footer display references the configs page
   - Multiple automation documentation pages on the site

5. **Issue Lifecycle**: Issues with "tested config" label are:
   - Exempt from the stale workflow (see `.github/workflows/stale.yml`)
   - Kept open as a permanent reference for the configuration
   - Should be organized and categorized by camera manufacturer/model

#### Best Practices for Tested Configs
- **Sanitization**: Always review configurations for sensitive data before documentation
- **Categorization**: Group configurations by manufacturer (e.g., Hikvision, Dahua, Reolink)
- **Validation**: Test configurations match the current plugin schema
- **Documentation**: Include setup notes and any special requirements
- **Updates**: Update documentation links when adding new tested configurations

#### Integration with Documentation Website
The project uses a documentation website (sunoo.github.io/homebridge-camera-ffmpeg/) that includes:
- `/configs/` - Tested configuration repository
- `/automation/mqtt.html` - MQTT automation documentation  
- `/automation/http.html` - HTTP automation documentation
- `/automation/switch.html` - Switch automation documentation

### Version Information
Current version: 4.0.1 (major version with breaking changes from v3.x)
- Dropped Node.js v18 support
- All cameras are now unbridged by default
- Moved to scoped npm package naming