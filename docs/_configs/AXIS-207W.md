---
title: AXIS 207W
author: cycu767
date: 2020-07-30
---
```json
{
	"name": "SOME NAME",
	"manufacturer": "AXIS",
	"model": "207W",
	"serialNumber": "SOME SERIAL NUMBER",
	"videoConfig": {
		"source": "-rtsp_transport tcp -i rtsp://user:password@IP/mpeg4/media.amp",
		"stillImageSource": "-i http://user:password@IP/jpg/image.jpg?size=3",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 30
	}
}
```
