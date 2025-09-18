---
title: Wyze Cam v3
author: Gus Muche
date: 2021-11-30
---
**Homebridge Config**

```json
{
	"name": "Test Cam",
	"unbridge": true,
	"manufacturer": "WYZE",
	"model": "WYZE_CAKP2JFUS",
	"videoConfig": {
		"source": "-i rtsp://user:pass@<ip_address>/live",
		"stillImageSource": "-i rtsp://user:pass@<ip_address>/live -vframes 1 -r 1",
		"audio": true,
		"maxStreams": 3,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 10,
		"maxBitrate": 299,
		"packetSize": 752,
		"debug": false,
		"additionalCommandline": "-protocol_whitelist https,crypto,srtp,rtp,udp"
	}
}
```

**Additional Information**

Installed v3 RTSP Firmware:
https://support.wyze.com/hc/en-us/articles/360026245231-Wyze-Cam-RTSP

Haven't tested motion or notifs but the Homekit app is more stable than the Wyze app... The Wyze app kept freezing on me in the middle of the night.
