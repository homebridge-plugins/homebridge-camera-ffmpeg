---
title: ThomView DSC-725S
author: Gus Muche
date: 2021-10-20
---
**Homebridge Config**

```json
{
	"name": "Camera",
	"manufacturer": "ThomView",
	"model": "DSC-725S",
	"unbridge": false,
	"videoConfig": {
		"source": "-i rtsp://username:password@XX.XXX.XXX.XXX:port/videoMain",
		"vcodec": "copy",
		"packetSize": 188,
		"audio": false
	}
}
```

**Additional Information**

`"vcodec": "libx264"` -> OK

`"packetSize": 1316` -> OK