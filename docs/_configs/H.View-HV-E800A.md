---
title: H.View HV-E800A
author: MA72E
date: 2021-12-11
---
**Homebridge Config**

```json
{
	"name": "name",
	"serialNumber": "original serialNumber",
	"firmwareRevision": "IPCAM_V4.04.40.210303",
	"motion": true,
	"unbridge": true,
	"videoConfig": {
		"source": "-i rtsp://user:password@ipadress:554/live/main",
		"maxWidth": 800,
		"maxHeight": 600,
		"maxFPS": 25
	}
}
```
