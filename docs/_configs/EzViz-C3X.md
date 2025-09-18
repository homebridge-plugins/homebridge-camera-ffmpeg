---
title: EzViz C3X
author: BEskandari
date: 2021-06-18
---
**Homebridge Config**

```json
{
	"name": "Camera",
	"manufacturer": "EZVIZ",
	"model": "C3X",
	"serialNumber": "XXXXXXX",
	"firmwareRevision": "5.2.5 build 210511",
	"unbridge": true,
	"videoConfig": {
		"source": "-i rtsp://user:pwd@192.x.x.x/Streaming/Channels/2",
		"stillImageSource": "-i rtsp://user:pwd@192.x.x.x/Streaming/Channels/2/picture",
		"maxStreams": 2,
		"maxWidth": 1920,
		"maxHeight": 1080,
		"maxFPS": 25,
		"maxBitrate": 1024,
		"packetSize": 188,
		"vcodec": "h264_omx",
		"videoFilter": "none",
		"audio": true,
		"debug": false
	}
}
```

**Additional Information**

Configuration on Raspberry Pi 4 
