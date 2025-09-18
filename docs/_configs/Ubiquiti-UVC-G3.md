---
title: Ubiquiti UVC G3
author: Deon
date: 2020-05-11
---
## config.json

```json
{
	"name": "CCTV Camera",
	"manufacturer": "Ubiquiti",
	"model": "UVC G3",
	"serialNumber": "XYZXYZYZY",
	"firmwareRevision": "4.14",
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://admin:xxxxxxx@172.16.33.67:554/s0",
		"maxStreams": 2,
		"maxWidth": 1920,
		"maxHeight": 1080,
		"maxFPS": 30,
		"vcodec": "copy",
		"audio": true,
		"mapvideo": "0:1",
		"mapaudio": "0:0"
	}
}
```
