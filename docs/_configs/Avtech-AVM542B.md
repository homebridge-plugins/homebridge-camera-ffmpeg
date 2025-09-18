---
title: Avtech AVM542B
author: Lukas Foukal
date: 2020-01-18
---
Server on Synology with Docker via oznu's homebridge-syno-spk

```json
{
	"name": "AVM542B",
	"motion": false,
	"manufacturer": "Avtech",
	"model": "AVM-542B",
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://admin:password@192.168.1.1/live/video/profile1",
		"maxStreams": 2,
		"maxWidth": 1920,
		"maxHeight": 1080,
		"maxBitrate": 500,
		"maxFPS": 5
	}
}
```
