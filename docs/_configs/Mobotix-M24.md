---
title: Mobotix M24
comment: with Raspberry Pi 3 Model B
author: tiele004
date: 2018-02-08
---
## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Mobotix M24",
		"videoConfig": {
			"source": "-f mxg -i http://user:password@192.168.100.100/control/faststream.jpg?stream=MxPEG",
			"stillImageSource": "-i http://user:password@192.168.100.100/cgi-bin/image.jpg",
			"maxStreams": 3,
			"maxWidth": 1920,
			"maxHeight": 1080,
			"maxFPS": 30
		}
	}]
}
```
