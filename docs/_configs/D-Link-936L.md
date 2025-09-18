---
title: D-Link 936L
author: Arne
date: 2017-10-06
---
Works on Raspberry Pi 3 (only with omx)

## config.json

```json
{
	"name": "D-Link Camera",
	"videoConfig": {
		"source": "-rtsp_transport tcp -i rtsp://admin:password@10.0.1.101:554/play1.sdp",
		"stillImageSource": "-i http://admin:password@10.0.1.101/image/jpeg.cgi",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 30,
		"vcodec": "h264_omx"
	}
}
```
