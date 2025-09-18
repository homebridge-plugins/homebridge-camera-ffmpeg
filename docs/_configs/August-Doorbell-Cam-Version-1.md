---
title: August Doorbell Cam Version 1
author: siobhanellis
date: 2020-01-27
---
## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "August",
		"manufacturer": "August",
		"model": "Doorbell Cam",
		"serialNumber": "XXXXXXXXX",
		"videoConfig": {
			"source": "-rtsp_transport tcp -i rtsp://admin:password@XXX.XXX.XXX.XXX:554/stream0",
			"stillImageSource": "-skip_frame nokey -i rtsp://admin:password@xxx.xxx.xxx.xxx:554/live/stream1 -frames:v 1",
			"maxStreams": 10,
			"maxWidth": 1280,
			"maxHeight": 960,
			"maxFPS": 30
		}
	}]
}
```

### Notes

Replace XXX.XXX.XXX.XXX, etc with your values.
Important that use make sure the live video is on stream0 and still is on stream1.
