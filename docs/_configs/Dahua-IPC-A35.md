---
title: Dahua IPC-A35
comment: with sound
author: Martin Kuneš
date: 2020-06-11
---
## config.json

```json
{
	"name": "Chodba",
	"manufacturer": "Dahua",
	"model": "IPC-A35",
	"serialNumber": "2L043A6AAK00059",
	"firmwareRevision": "2.400.0000000.16.R",
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://USERNAME:PASSWORD@CAMERA-IP:PORT//cam/realmonitor?channel=1&subtype=0",
		"vcodec": "libx264 -preset ultrafast",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 30,
		"maxBitrate": 2048,
		"packetSize": 376,
		"audio": true,
		"mapaudio": "0:1"
	}
}
```
