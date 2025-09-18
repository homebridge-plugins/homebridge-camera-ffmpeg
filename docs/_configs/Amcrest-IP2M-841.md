---
title: Amcrest IP2M-841
author: Brad Gessler
date: 2017-09-25
---
Tested from Linux. These camera's aren't that great and have difficulty holding a stream for longer than 30s.

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Nursery Camera",
		"videoConfig": {
			"source": "-xerror -rtsp_transport tcp -i rtsp://username:password@10.0.1.5/cam/realmonitor?channel=1&subtype=0 -c:a aac -b:a 128k -c:v libx264 -b:v 2500k -preset superfast",
			"stillImageSource": "-i http://username:password@10.0.1.5/cgi-bin/snapshot.cgi",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 30
		}
	}]
}
```
