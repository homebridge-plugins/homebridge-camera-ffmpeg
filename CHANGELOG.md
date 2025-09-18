# Changelog

All notable changes to this project will be documented in this file. This project uses [Semantic Versioning](https://semver.org/)

## [4.1.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v4.1.0) (2025-09-18)

## What's Changed
* Update Workflow by @Donavan Becker in https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/commit/5712800
* update dependencies by @Donavan Becker in https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/commit/1c3eeec
* Update Workflow by @Donavan Becker in https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/commit/76139d0
* Fix camera streaming timeout issue causing premature stream termination  by @Copilot in https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/pull/1515
* Fix HKSV recording stream closure with prebuffer integration and H.264 optimization  by @Copilot in https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/pull/1511
* Add tested configuration management to copilot instructions  by @Copilot in https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/pull/1513

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v4.0.1...v4.1.0

## [4.0.1](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v4.0.1) (2025-03-04)

### What's Changes
- Housekeeping and updated dependencies.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v4.0.0...v4.0.1

## [4.0.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v4.0.0) (2025-01-26)

### What's Changes
#### Breaking Changes
- *Alpha*: Added support for HKSV
- Now Supporting Node v20 ot v22
- In this version we force all cameras to be `unbridged`
  - If you do not unbridge your cameras before upgrading your cameras, you will loose functionality.
  - To unbridge in previous version go into the camera config and check the ubridged checkbox.
  - the unbridge config has been removed in this version since all cameras are unbridged.

#### Other Changes
- Move plugin over to scoped plugin

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.1.4...v4.0.0

## [3.1.4](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.1.4) (2021-12-28)

### What's Changes
- *Fix*: Pinned mqtt to 2.3.8 to avoid "Maximum call stack size exceeded" error.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.1.3...v3.1.4

## [3.1.3](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.1.3) (2021-08-24)

### What's Changes
- Errors from FFmpeg are once again hidden when not in debug mode. This will be tweaked in the future.
- An attempt will now be made to gracefully shut down FFmpeg before force killing it.
- *Fix*: Port selection should now correctly grab an open UDP port.
- *Fix*: When using motionDoorbell, the doorbell is now only rung when the motion cooldown has run.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.1.2...v3.1.3

## [3.1.2](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.1.2) (2021-03-05)

### What's Changes
- Errors from FFmpeg are now always logged.
- Improvements to snapshot caching.
- *Fix*: Streams should no longer end after roughly 3 minutes.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.1.1...v3.1.2

## [3.1.1](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.1.1) (2021-03-01)

### What's Changes
- Snapshots are now briefly cached. This will prevent bombarding the camera with requests for new snapshots when motion alerts are triggered.
- Improved messaging when cameras respond slowly.
- Minor tweaks.
- Updated dependencies.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.1.0...v3.1.1

## [3.1.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.1.0) (2021-02-20)

### What's Changes
#### Breaking Changes
- Complete rework of MQTT support. Now topics and messages are configurable per camera, which should allow any camera with MQTT support to work directly with this plugin. If you need compatibility with the way prior versions worked, you can follow [this config example](https://homebridge-plugins.github.io/homebridge-camera-ffmpeg/automation/mqtt.html#legacy-compatibility).
- Dropped support for older versions of Homebridge, now requires version 1.1.3 or newer.

#### Other Changes
- *Fix*: Fixed warnings under Homebridge 1.3 when using switches.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.0.6...v3.1.0

## [3.0.6](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.0.6) (2021-02-17)

### What's Changes
- Added `motionDoorbell` to ring the doorbell when motion is activated in order to allow motion alerts to be displayed on Apple TVs.
- HTTP server now returns JSON to provide additional information to helper plugins.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.0.5...v3.0.6

## [3.0.5](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.0.5) (2021-02-15)

### What's Changes
- Code cleanup and general housekeeping.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.0.4...v3.0.5

## [3.0.4](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.0.4) (2021-02-15)

### What's Changes
- Added warning when attempting to use videoFilter with the copy vcodec.
- Added support for connecting to an MQTT broker with TLS.
- Updated dependencies.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.0.3...v3.0.4

## [3.0.3](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.0.3) (2020-09-02)

### What's Changes
- Updated dependencies.

### Note
- Homebridge 1.1.3 is now out. It is highly recommended to upgrade as it should completely resolve the issue that caused live video not to work while snapshots continued to update. Once you upgrade, `interfaceName` will no longer have any impact. At some point in the future this plugin will drop support for Homebridge 1.1.2 and lower and also remove the `interfaceName` option.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.0.2...v3.0.3

## [3.0.2](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.0.2) (2020-08-30)

### What's Changes
- Allow `=` in the URL for HTTP automation for systems that require it. Everything after the `=` will be ignored.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.0.1...v3.0.2

## [3.0.1](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.0.1) (2020-08-25)

### What's Changes
- *Fix*: Fixed an issue with inactive camera timeouts that could cause zombie FFmpeg processes.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v3.0.0...v3.0.1

## [3.0.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v3.0.0) (2020-08-24)

### What's Changes
### Breaking Changes
- `additionalCommandline` has been replaced by `encoderOptions` to better reflect it's intended use.
- `preserveRatio` has been removed and is now active as long as the default `videoFilter` list is active.

#### Other Changes
- This plugin now includes __experimental__ two-way audio support. Be aware that this feature is likely to be tweaked in the future, and a configuration that works now may need to be altered in the future.
- Better detection of audio and video streams. There should be very few scenarios where `mapvideo` or `mapaudio` are needed anymore, as FFmpeg's stream auto-selection is now set up.
- Default `videoFilter` can be disabled by including `none` in your comma-delimited list of filters.
- Further reorganization of the config UI.
- Fix: Corrected handling of inactive camera timeouts. You should no longer see timeout messages after cleanly closing a camera stream.
- *Fix*: Fixed `forceMax` not applying to resolution in some scenarios.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.5.0...v3.0.0

## [2.5.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.5.0) (2020-08-23)

### What's Changes
### Breaking Changes
- Horizontal and vertical flip have been removed. If you need these options, pass `hflip` and/or `vflip` in `videoFilter`.
- `forceMax` has resulted in the removal of `minBitrate`, as it is now redundant. To replicate the old behavior, set `maxBitrate` to the bitrate you want to use and set `forceMax` to true.
- `preserveRatio` is now a boolean to reduce confusion and support the better handling of that option.

- ### Other Changes
- `forceMax` has been added. This will force the use of `maxWidth`, `maxHeight`, `maxFPS`, and `maxBitrate` when set.
- If `maxWidth`, `maxHeight`, or `maxFPS` are set to `0`, the width, height, or framerate of the source will now be used for the output.
- If `maxBitrate` is set to `0`, the bitrate of the encoder will not be limited. I strongly recommend against this, but it is a better option than setting it to `999999` or similar values, as I've seen in some configs.
- Reorganized config UI options.
- *Fix:* Fix handling of IPv6 connections.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.4.7...v2.5.0

## [2.4.7](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.4.7) (2020-08-17)

### What's Changes
- Changed the way external IP address is determined. This should result in video streams working by default in more setups.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.6.0...v2.4.7

## [2.4.6](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.4.6) (2020-08-16)

### What's Changes
- *Fix:* Fix MQTT/HTTP automation when unbridge is used.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.4.5...v2.4.6

## [2.4.5](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.4.5) (2020-08-15)

### What's Changes
- Return messages and error codes when using HTTP automation.
- *Fix:* Fixed bug preventing MQTT/HTTP automation from working.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.4.4...v2.4.5

## [2.4.4](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.4.4) (2020-08-07)

### What's Changes
- Added support for unbridging specific cameras. This can aid with performance of the camera and Homebridge as a whole, but requires manually adding any unbridged cameras to HomeKit.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.4.3...v2.4.4

## [2.4.3](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.4.3) (2020-07-29)

### What's Changes
- Trigger switches are now turned on and off with HTTP or MQTT messages as well.
- Removed doorbell stateless switch because it had no functionality.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.4.2...v2.4.3

## [2.4.2](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.4.2) (2020-07-27)

### What's Changes
- Properly shut down sessions when devices go inactive.
- *Fix:* Fixed some debug messages.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.4.1...v2.4.2

## [2.4.1](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.4.1) (2020-07-24)

### What's Changes
- Added warning when multiple NICs detected.
- *Fix:* Fix error using copy vcodec.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.4.0...v2.4.1

## [2.4.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.4.0) (2020-07-24)

### What's Changes
- Major rework of code to make future maintenance easier.
- Added setting to limit HTTP server to listening on localhost only.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.3.2...v2.4.0

## [2.3.2](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.3.2) (2020-07-19)

### What's Changes
- FFmpeg processes are now killed when the iOS device goes inactive and when stopping Homebridge.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.3.1...v2.3.2

## [2.3.1](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.3.1) (2020-07-16)

### What's Changes
- Tweaks to logging to reduce confusion and provide more information.
- Added authentication support to MQTT.
- Reduced the FFmpeg log level in debug mode.
- *Fix:* The minimum bitrate option is now working again.
- *Fix:* Maximum bitrate and frame rate are no longer capped below what devices request when not set in the config.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.3.0...v2.3.1

## [2.3.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.3.0) (2020-07-14)

### What's Changes
- Added HTTP support for motion detection and doorbells.
- Separated MQTT doorbell and motion messages.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.8.0...v2.8.1

## [2.2.2](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.2.2) (2020-07-13)

### What's Changes
- Restored ability to specify which network interface to use.
- *Fix:* Fixed handling of non-printing characters in config.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.2.1...v2.2.2

## [2.2.1](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.2.1) (2020-07-11)

### What's Changes
- *Fix:* Fixed bug preventing Homebridge from starting.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.2.0...v2.2.1

## [2.2.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.2.0) (2020-07-11)

### What's Changes
- Now properly allows for changing camera manufacturer, model, etc.
- Minor tweaks to configuration UI screen.
- Update dependencies.
- *Fix:* Fixed a bug when the doorbellSwitch config option was enabled.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.1.1...v2.2.0

## [2.1.1](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.1.1) (2020-07-08)

### What's Changes
- Update Dependencies.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.1.0...v2.1.1

## [2.1.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.1.0) (2020-07-06)

### What's Changes
- Add MQTT support for Motion Detect (#572), thanks to [fennec622](https://github.com/fennec622).
  - See [MQTT Motion Wiki](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/wiki/MQTT-Motion) for more details.
- Add stateless button for doorbell cameras.
- Add option to disable manual automation switches.
- Re-Added videoFilter.
- *Fix:* Fixed most FFmpeg issues where users were receiving issues with ffmpeg exit 1 error.
- *Fix:* Fixed Logging.
- *Fix:* Fixed most videoFilter configs not working.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.0.1...v2.1.0

## [2.0.1](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.0.1) (2020-06-28)

### What's Changes
- Update Dependencies.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v2.0.0...v2.0.1

## [2.0.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v2.0.0) (2020-06-19)

### What's Changes
### Breaking Changes
- Code has been refactored to typescript, thanks to [Brandawg93](https://github.com/Brandawg93).
- Plugin requires homebridge >= 1.0.0.
- Cameras no longer need to be manually added to homebridge
	- Cameras are now bridged instead of being created as external accessories in homebridge. 
	- Once you update, you will see two copies of each of your cameras.
	- You will need to manually remove the old cameras from HomeKit by going into the cameras' settings and choosing "Remove Camera from Home". 
	- The new bridged cameras will not have this option, and will instead have a "Bridge" button.
	- You will also need to copy over any automations that you had tied to your cameras, such as motion detection.

### Other Changes
- Google Drive Upload has been removed in this update. PRs are welcome for other Video Cloud Options.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v1.3.0...v2.0.0

## [1.3.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v1.3.0) (2020-06-18)

### What's Changes
- Update ffmpeg-for-homebridge to 0.0.6.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v1.2.2...v1.3.0

## [1.2.2](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v1.2.2) (2020-05-28)

### What's Changes
- *Fix:* Fix for Fake Motion Sensor, it was not reseting after Motion Events.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v1.2.1...v1.2.2

## [1.2.1](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v1.2.1) (2020-05-28)

### What's Changes
- *Fix:* Fixes [#522](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/issues/522), Cleans Up and Condenses the code around the motion switch.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v1.2.0...v1.2.1

## [1.2.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v1.2.0) (2020-05-27)

### What's Changes
- Update ffmpeg-for-homebridge to 0.0.5

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v1.1.1...v1.2.0

## [1.1.1](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v1.1.1) (2020-05-14)

### What's Changes
- Adds debug log for `videoProcessor`.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v1.1.0...v1.1.1

## [1.1.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v1.1.0) (2020-05-13)

### What's Changes
- Adds an option to have a camera behave like a video doorbell, including a switch to trigger doorbell events (automate the switch to get notifications)
- Add Manufacturer, Model, Serial, and Firmware Revision into config.schema.json.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/v1.0.0...v1.1.0

## [1.0.0](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/releases/tag/v1.0.0) (2020-05-11)

### What's Changes
### Breaking Changes
- homebridge-camera-ffmpeg now comes bundled with it's own pre-built static ffmpeg binaries that are compiled with support for audio (libfdk-aac) and hardware decoding (h264_omx). The following platforms are supported:
  - Raspbian Linux - armv6l (armv7l)
  - Debian/Ubuntu Linux	- x86_64, armv7l, aarch64
  - Alpine Linux - x86_64, armv6l, aarch64
  - macOS (10.14+) - x86_64
  - Windows 10 - x86_64
- If your platform is not supported the plugin will fallback to using your global install of `ffmpeg` automatically.
- Should you wish to force the plugin to use the global install of `ffmpeg` instead of the provided copy, you can simply set `videoProcessor` option to `ffmpeg`. Example:
    ```json
    {
      "platform": "Camera-ffmpeg",
      "videoProcessor": "ffmpeg",
      "cameras": [
        ...
      ]
    }
    ```

### Other Changes
- Initial release.

**Full Changelog**: https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/compare/initial-commit...v1.0.0
