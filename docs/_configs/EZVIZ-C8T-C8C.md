---
title: EZVIZ C8T / C8C
author: nevada_scout
date: 2022-03-12
---
**Homebridge Config**

```json
{
	"name": "EZVIZ Camera",
	"manufacturer": "EZVIZ",
	"model": "C8C",
	"serialNumber": "XXXXXXXXX",
	"unbridge": true,
	"videoConfig": {
		"source": "-i rtsp://user@pwd@192.x.x.x/Streaming/Channels/1/",
		"stillImageSource": "-i rtsp://user@pwd@192.x.x.x/Streaming/Channels/1/picture",
		"maxWidth": 1920,
		"maxHeight": 1080,
		"maxFPS": 25,
		"maxBitrate": 1024,
		"vcodec": "h264_omx",
		"packetSize": 188,
		"videoFilter": "none"
	}
}
```

**Additional Information**

Configuration on Raspberry Pi 4B

The box for the camera says "C8T" but in the app it says that the model is "C8C Lite".
