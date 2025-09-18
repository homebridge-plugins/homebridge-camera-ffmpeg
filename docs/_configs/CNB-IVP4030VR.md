---
title: CNB IVP4030VR
comment: via RPI Model B
author: migabc
date: 2018-04-21
---
CNB IP Camera
Model number:IVP4030VR

Homebridge config.json:

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Front Gate Camera",
		"videoConfig": {
			"source": "-re -i rtsp://<192.168.X.X:665",
			"maxStreams": 2,
			"maxWidth": 640,
			"maxHeight": 480,
			"maxFPS": 24,
			"maxBitrate": 1024,
			"vcodec": "h264_omx",
			"audio": false,
			"packetSize": 188,
			"debug": true
		}
	}]
}
```
