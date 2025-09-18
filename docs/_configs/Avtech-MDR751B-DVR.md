---
title: Avtech MDR751B DVR
author: badnimits
date: 2019-01-10
---
Server running on windows 10.

```json
{
	"name": "Entrance Camera",
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://admin:admin@192.168.1.26/live/h264",
		"maxStreams": 1,
		"maxWidth": 640,
		"maxHeight": 480,
		"maxFPS": 30
	}
}
```
