---
title: Amcrest IP8M-2496EB
comment: 4K POE Camera
author: MatthewKovalcik
date: 2021-09-29
---
**Homebridge Config**

```json
{
	"name": "Front Door",
	"unbridge": true,
	"videoConfig": {
		"source": "-i rtsp://USERNAME:PASSWORD@INTERNALIP:554/cam/realmonitor?channel=1&subtype=0",
		"maxWidth": 1920,
		"maxHeight": 1080
	}
}
```
