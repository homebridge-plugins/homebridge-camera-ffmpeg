---
title: EzViz C3 Husky
comment: settings also work for the CTQ3W
author: Careless 2000
date: 2020-09-30
---
**Homebridge Config**

```json
{
	"name": "Camera",
	"videoConfig": {
		"source": "-vcodec h264 -i rtsp://admin:******@192.x.x.x/Streaming/Channels/1",
		"stillImageSource": "-i rtsp://admin:*****@192.x.x.x/Streaming/Channels/1/picture",
		"vcodec": "copy",
		"audio": true,
		"maxFPS": 30,
		"maxWidth": 1920,
		"maxHeight": 1080,
		"videoFilter": "none",
		"maxBitrate": 1024,
		"packetSize": 188,
		"maxStreams": 2,
		"additionalCommandline": "-x264-params intra-refresh=1:bframes=0 -loglevel verbose",
		"debug": true
	}
}
```
