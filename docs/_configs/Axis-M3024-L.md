---
title: Axis M3024-L
comment: with Raspberry Pi 3 Model B
author: tiele004
date: 2018-02-08
---
## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Axis M3024-L",
		"videoConfig": {
			"source": "-rtsp_transport tcp -i rtsp://user:password@192.168.100.100:554/axis-media/media.amp?streamprofile=Media?tcp",
			"stillImageSource": "-i http://user:password@192.168.100.100/axis-cgi/jpg/image.cgi",
			"maxStreams": 3,
			"maxWidth": 1920,
			"maxHeight": 1080,
			"maxFPS": 30,
			"vcodec": "h264_omx"
		}
	}]
}
```