---
title: AXIS P1344
author: cycu767
date: 2020-07-30
---
```json
{
	"name": "SOME NAME",
	"manufacturer": "AXIS",
	"model": "P1344",
	"serialNumber": "SOME SERIAL NUMBER",
	"videoConfig": {
		"source": "-rtsp_transport tcp -i rtsp://user:password@IP/axis-media/media.amp",
		"stillImageSource": "-i http://user:password@IP/jpg/image.jpg",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 800,
		"maxFPS": 30
	}
}
```
