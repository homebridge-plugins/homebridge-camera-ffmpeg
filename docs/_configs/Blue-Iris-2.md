---
title: Blue Iris
comment: updated
author: meluvalli
date: 2021-12-07
---
**Homebridge Config**

```json
{
	"name": "My Camera",
	"motion": true,
	"switches": true,
	"unbridge": true,
	"videoConfig": {
		"source": "-rtsp_transport tcp -probesize 32 -analyzeduration 0 -re -i rtsp://[Blue Iris ip address]:[Blue Iris HTTP Port]/[Camera or GroupName]",
		"stillImageSource": "-i http://[Blue Iris ip address]:[Blue Iris HTTP Port]/image/[Camera or GroupName]?q=75",
		"maxFPS": 0,
		"vcodec": "copy",
		"audio": true,
		"debug": true
	}
}
```

**Additional Information**

Note: There is already a Blue Iris config posted, however it uses HLS and is HORIBLE resaults! I would recommend updating :)
