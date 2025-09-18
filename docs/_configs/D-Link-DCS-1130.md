---
title: D-Link DCS-1130
author: NicholasB60
date: 2021-02-16
---
## Homebridge Config

```json
{
	"name": "D-Link Camera",
	"videoConfig": {
		"source": "-re -f mjpeg -i http://admin:password@localip:port/video/mjpg.cgi",
		"stillImageSource": "-i http://admin:password@localip:port/image/jpeg.cgi",
		"maxStreams": 2,
		"maxWidth": 320,
		"maxHeight": 240,
		"maxFPS": 30
	}
}
```
