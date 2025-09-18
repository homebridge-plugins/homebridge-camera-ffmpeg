---
title: G.Craftsman 5Mp H.265
author: DobriyVasia
date: 2021-01-16
---
**Homebridge Config**

```json
{
	"name": "Калитка",
	"videoConfig": {
		"source": "-rtsp_transport tcp -i rtsp://admin:12345@192.168.0.144:554/ch01.264?dev=1/live",
		"stillImageSource": "-rtsp_transport tcp -i rtsp://admin:12345@192.168.0.144:554/ch01.264?dev=1/live -vframes 1 -r 1",
		"vcodec": "copy",
		"maxStreams": 2,
		"motion": true,
		"maxWidth": 2560,
		"maxHeight": 1920,
		"maxFPS": 15,
		"audio": true,
		"additionalCommandline": "-protocol_whitelist https,crypto,srtp,rtp,udp"
	}
}
```
