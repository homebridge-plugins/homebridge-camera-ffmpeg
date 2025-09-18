---
title: Wyze Cam v2 and Pan
author: recoi1er
date: 2021-04-22
---
**Homebridge Config**

```json
{
	"name": "CAMERA NAME",
	"manufacturer": "Wyze",
	"model": "Wyze Cam v2 OR Pan",
	"serialNumber": "SERIAL#",
	"firmwareRevision": "VERSION#",
	"unbridge": false,
	"videoConfig": {
		"source": "-rtsp_transport tcp -i rtsp://USER:PASS@IP/live",
		"stillImageSource": "-rtsp_transport tcp -i rtsp://USER:PASS@IP/live -vframes 1 -r 1",
		"additionalCommandline": "-protocol_whitelist https,crypto,srtp,rtp,udp",
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 15,
		"maxStreams": 2,
		"audio": true,
		"vcodec": "copy",
		"motion": true
	}
}
```

**Additional Information**

"unbridge" is recommend in the plugin configuration but I could get not any camera to appear in HomeKit until I after I set it to false (or removed it from config), I tested it on bare bones where I removed most of the settings listed above to make sure none of them were in conflict.
