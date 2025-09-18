---
title: IeGeek IP camera
comment: with Raspberry Pi 3 Model B
author: mach1009
date: 2017-12-26
---
You can also use "rtsp://ip-address/11" for HQ-Stream.

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Camera",
		"videoConfig": {
			"source": "-rtsp_transport tcp -re -i rtsp://ip-address/12",
			"stillImageSource": "-i http://username:password@ip-address/tmpfs/auto.jpg",
			"maxStreams": 2,
			"maxWidth": 640,
			"maxHeight": 352,
			"maxFPS": 5,
			"vcodec": "h264_omx"
		}
	}]
}
```
