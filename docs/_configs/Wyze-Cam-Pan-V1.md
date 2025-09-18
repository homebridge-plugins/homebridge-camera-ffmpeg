---
title: Wyze Cam Pan V1
comment: running on Raspberry Pi 4b
author: techeadred
date: 2020-12-07
---
**Homebridge Config**

```json
{
	"name": "name",
	"manufacturer": "Wyze",
	"model": "Wyze Cam Pan",
	"firmwareRevision": "4.29.4.49",
	"motion": true,
	"videoConfig": {
		"source": "-i rtsp://admin:password@1.1.1.1/live",
		"stillImageSource": "http://admin:password@1.1.1.1/image.jpg",
		"vcodec": "copy",
		"maxWidth": 1920,
		"maxHeight": 1080,
		"maxFPS": 15,
		"maxBitrate": 16,
		"forceMax": true,
		"audio": true
	}
}
```

**Additional Information**

I was able to get the Wyze Cam Pan streaming to HomeKit with no transcoding and no custom compiling required using the following settings.
