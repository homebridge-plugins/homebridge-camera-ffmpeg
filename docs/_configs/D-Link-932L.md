---
title: D-Link 932L
author: gilesmartin
date: 2017-01-31
---
Works on Mac Mini core i5, Raspberry Pi 3 (with and without omx)

## config.json

```json
{
	"name": "D-Link Camera",
	"videoConfig": {
		"source": "-re -f mjpeg -i http://admin:password@10.0.1.101/mjpeg.cgi -i http://admin:password@10.0.1.101/audio.cgi",
		"stillImageSource": "-f mjpeg -i http://admin:password@10.0.1.101/mjpeg.cgi",
		"maxStreams": 2,
		"maxWidth": 640,
		"maxHeight": 480,
		"maxFPS": 30
	}
}
```
