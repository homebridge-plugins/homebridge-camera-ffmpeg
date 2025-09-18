---
title: Amcrest IPM-HX1B
comment: with MP4 Passthrough
author: Eric Cirone
date: 2020-05-27
---
## config.json

```json
{
	"name": "Camera",
	"motion": true,
	"videoConfig": {
		"source": "-i rtsp://admin:PASSWORD@192.168.1.2/cam/realmonitor?channel=1&subtype=0",
		"stillImageSource": "-i http://admin:PASSWORD@192.168.1.2/cgi-bin/snapshot.cgi",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 960,
		"maxFPS": 30,
		"audio": true,
		"preserveRatio": "W",
		"vcodec": "copy",
		"acodec": "copy"
	}
}
```
