---
title: Hikvision DS-2CD2423G0-IW
author: guzi2007
date: 2021-07-19
---
**Homebridge Config**

```json
{
	"name": "Camera IP",
	"model": "DS-2CD2423G0-IW",
	"serialNumber": "XXX:YYY",
	"firmwareRevision": "V5.5.83 build 190221",
	"unbridge": true,
	"videoConfig": {
		"source": "-i rtsp://username:password@ipaddress:554",
		"maxStreams": 2,
		"maxWidth": 800,
		"maxHeight": 600,
		"maxFPS": 25,
		"audio": true
	}
}
```

**Additional Information**

If maxWidth or maxHeight is set for more than 800 and 600 respectively or not set at all, the camera does not show the live view.
