---
title: Intelbras im3
author: pedroxns
date: 2020-11-17
---
**Homebridge Config**

```json
{
	"name": "Babá Eletrônica",
	"manufacturer": "Intelbras",
	"model": "im3",
	"serialNumber": "a1b2c3",
	"firmwareRevision": "fw123",
	"doorbell": false,
	"unbridge": true,
	"videoConfig": {
		"source": "-i rtsp://admin:<CAMERA KEY@<CAMERA IP>:554/cam/realmonitor?channel=1&subtype=0",
		"stillImageSource": "-i rtsp://admin:<CAMERA KEY@<CAMERA IP>:554/cam/realmonitor?channel=1&subtype=0",
		"maxStreams": 4,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 30,
		"maxBitrate": 9001,
		"minBitrate": 9000,
		"audio": true
	}
}
```

**Additional Information**

Intelbras is a Brazilian security system manufacturer, some cameras has RTSP access after enabling ONFIV protocol over the camera app settings.
