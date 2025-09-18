---
title: AirBeam iOS App
comment: with Audio and Motion Detection Support via mqtt
author: jotzet79
date: 2021-09-10
---
**Homebridge Config:**

```json
{
	"name": "Phone Cam",
	"model": "AirBeam on iPhone 4S / iOS 9.3",
	"serialNumber": "0123456789",
	"motion": true,
	"switches": true,
	"motionTimeout": 5,
	"unbridge": true,
	"videoConfig": {
		"source": "-use_wallclock_as_timestamps 1 -thread_queue_size 1024 -re -probesize 32 -analyzeduration 0 -i http://[IP_ADDRESS:PORT]/service/camera/video.mjpeg -fflags nobuffer -probesize 32 -analyzeduration 0 -i http://[IP_ADDRESS:PORT]/service/camera/audio.aac",
		"stillImageSource": "-re -probesize 32 -analyzeduration 0 -i http://[IP_ADDRESS:PORT]/service/camera/video.mjpeg",
		"maxFPS": 10,
		"forceMax": true,
		"packetSize": 188,
		"encoderOptions": "-preset ultrafast -tune zerolatency",
		"audio": true,
		"debug": false
	},
	"mqtt": {
		"motionTopic": "homebridge/camera-ffmpeg/Phone%20Cam/motionDetected",
		"motionMessage": "yes",
		"motionResetTopic": "homebridge/camera-ffmpeg/Phone%20Cam/motionDetected",
		"motionResetMessage": "no"
	}
}
```

**Additional Information:**

### Features
 - Audio
 - Motion Detection
 - Video ;-)

### Settings in AirBeam
- Camera
  - Activate Audio / Video
  - Format: High
  - Limit Frame Rate: 10FPS
  - No Overlays / AutoFocus / Mirror

-  Streaming
   - Video: Motion JPEG (H264 Setting is useless; App always outputs MJPEG)
   - Audio: AAC
   - Video Resolution: 50%
   - Quality: 50%
   - No UDP 


### Node-RED Flow for listening to AirBeam's MotionDetected Events
 - Flow AirBeamConnectableFlow
   - Configurable Array of Cameras
   - Detect if Camera devices (= Phones) are not reachable (e.g. if not connected to WiFi), and setting global value
   - Detet if Video / Audio / Motion service (= AirBeam) is not consumable (e.g. if app is not running), and setting global value
   ![Node-RED Flow AirBeamConnectableFlow](https://user-images.githubusercontent.com/44292689/132904112-fa79a5b0-642e-4a13-9638-682f593533b5.png)

 - Flow AirBeamMotionDetection
   - Stop sending mqtt messages if not reachable / consumable, see above
   - Sends mqtt messages of all configured active cams based on MotionDetection attribute of AirBeam Camera's status
   ![Node-RED Flow AirBeamMotionDetection](https://user-images.githubusercontent.com/44292689/132904121-30f3fd37-39e9-4db0-bcf6-b19e0d7d20e8.png)

[Node-RED_AirBeamCameraMotionDetectionFlow.flow.txt](https://github.com/Sunoo/homebridge-camera-ffmpeg/files/7145917/Node-RED_AirBeamCameraMotionDetectionFlow.flow.txt)

Latency when opening the stream is BLAZING fast now (even a bit better than my native Logitech Circle 2 Cams), delays / lags are <1s, and the audio is properly in sync with video (was the biggest "issue").

Running smooth on Raspberry 4b, OS 32bit / RAM 4GB:
Raspi's Load is 60% / Temp is around 75°C when running 2 camera streams simultaneously (8% / ~60-65°C in normal operation mode).
