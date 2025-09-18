---
title: Dahua IPC-HFW1320S-W
author: Martin Kuneš
date: 2020-06-11
---
## config.json

```json
{
	"name": "Pracovna",
	"manufacturer": "Dahua",
	"model": "IPC-HFW1320S-W",
	"serialNumber": "4A040C2PAU4C91E",
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
		"audio": false
	}
}
```
