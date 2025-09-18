---
title: TP-Link Tapo C200
comment: with motion detection
author: mihailescu2m
date: 2021-10-10
---
**Homebridge Config**

```json
{
	"name": "Tapo-1",
	"manufacturer": "Tp-Link",
	"model": "C200",
	"serialNumber": "2001",
	"unbridge": true,
	"motion": true,
	"motionTimeout": 0,
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://[USER]:[PASS]@[CAM.IP]:554/stream2",
		"stillImageSource": "-i rtsp://[USER]:[PASS]@[CAM.IP]:554/stream2",
		"maxWidth": 640,
		"maxHeight": 480,
		"maxFPS": 15,
		"maxBitrate": 384,
		"forceMax": true,
		"vcodec": "copy",
		"audio": true
	},
	"mqtt": {
		"motionTopic": "onvif2mqtt/Tapo-1/motion",
		"motionMessage": "ON",
		"motionResetTopic": "onvif2mqtt/Tapo-1/motion",
		"motionResetMessage": "OFF"
	}
}
```

**Additional Information**

Motion detection set up using onvif2mqtt.

~3s delay for the 640x480 stream (stream2).

In the debug info, Getting the first frames took usually shows ~3s.
