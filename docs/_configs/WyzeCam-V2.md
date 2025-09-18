---
title: WyzeCam V2
comment: with Raspberry Pi 4 Model B
author: Luke Hoersten
date: 2020-02-16
---
As described in this [blog post](https://medium.com/dirigible/wyze-cam-homekit-58c4878c4124), I was able to get the WyzeCam V2 streaming to HomeKit with no transcoding and no custom compiling required using the following settings.

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Wyze Cam",
		"videoConfig": {
			"source": "-i rtsp://username:password@192.168.0.100/live",
			"stillImageSource": "-i rtsp://username:password@192.168.0.100/live -vframes 1 -r 1",
			"vcodec": "copy"
		}
	}]
}
```
