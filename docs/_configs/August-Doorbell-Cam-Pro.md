---
title: August Doorbell Cam Pro
author: jlg89
date: 2020-11-03
---
**Homebridge Config**

```json
{
	"name": "DoorbellCam",
	"manufacturer": "August Home",
	"model": "Doorbell Cam Pro",
	"serialNumber": "ABCD12345",
	"motion": true,
	"motionTimeout": 15,
	"videoConfig": {
		"source": "-i rtsp://admin:admin@192.168.0.10/live/stream",
		"stillImageSource": "-i rtsp://admin:admin@192.168.0.10/live/stream -vframes 1 -r 1",
		"maxStreams": 2,
		"maxWidth": 480,
		"maxHeight": 640,
		"maxFPS": 10,
		"audio": true,
		"debug": false
	}
}
```

**Additional Information**

[Included](https://sunoo.github.io/homebridge-camera-ffmpeg/automation/motion.html) is a writeup on configuring an RPi with Motion to monitor the RTSP stream from an August Doorbell Cam and generate MQTT motion events in homebridge-camera-ffmpeg.
