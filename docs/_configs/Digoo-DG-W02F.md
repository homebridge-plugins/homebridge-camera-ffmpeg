---
title: Digoo DG-W02F
author: LeJeko
date: 2019-04-04
---
Working through RTSP on RaspberryPi

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Digoo",
		"videoConfig": {
			"vcodec": "h264_omx",
			"source": "-re -i rtsp://XXX.XXX.XXX.XXX",
			"maxFPS": 25,
			"maxHeight": 720,
			"maxStreams": 2,
			"maxWidth": 1280
		}
	}]
}
```
