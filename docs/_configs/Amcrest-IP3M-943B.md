---
title: Amcrest IP3M-943B
comment: Working with Motion and MotionDoorbell
author: Brad Downey
date: 2021-08-24
---
**Homebridge Config**

```json
{
	"name": "Front Door Camera",
	"manufacturer": "Amcrest",
	"model": "IP3M-943B",
	"motion": true,
	"doorbell": true,
	"motionTimeout": 0,
	"motionDoorbell": true,
	"unbridge": true,
	"videoConfig": {
		"source": "-i rtsp://admin:admin@192.168.128.123/cam/realmonitor?channel=1&subtype=0",
		"stillImageSource": "-i http://admin:admin@192.168.128.123/cgi-bin/snapshot.cgi?chan=1",
		"maxWidth": 0,
		"maxHeight": 0,
		"maxFPS": 0,
		"maxBitrate": 2048,
		"forceMax": true,
		"vcodec": "copy",
		"audio": false,
		"debug": false
	}
}
```

**Additional Information**

`dahua-alerts` reaches out to each camera at `/cgi-bin/eventManager.cgi?action=attach&codes=[VideoMotion]'` and the camera will send a notification when motion is detected. `dahua-alerts` will then send an http post to the http motion detection for `Camera-ffmpeg`

I'm even getting Doorbell alerts on my Apple TV. So Cool!!
