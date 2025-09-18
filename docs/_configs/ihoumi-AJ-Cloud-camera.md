---
title: ihoumi AJ Cloud camera
comment: might also work for wansview cameras
author: Alberto Xamin
date: 2021-03-24
---
**Homebridge Config**

```json
{
	"name": "Cancello Ingresso",
	"unbridge": true,
	"videoConfig": {
		"source": "-rtsp_transport tcp -i rtsp://USERNAME:PASSWORD@IPADDRESS:554/live/ch1"
	}
}
```

**Additional Information**

`/live/ch1` is for 720p
`/live/ch0` is for 1080p

I guess ihoumi is just a reseller for these cameras that use the app AJ Cloud
