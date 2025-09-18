---
title: TP-Link C200
author: jonasophie
date: 2020-04-17
---
Model C 200

## config.json

```json
{
	"name": "Camera ffmpeg",
	"cameras": [{
		"name": "Camera-Salo_",
		"manufacturer": "TP-Link",
		"model": "C200",
		"serialNumber": "1C3BF372F96C",
		"firmwareRevision": "1.0.5",
		"videoConfig": {
			"source": "-re -i rtsp://user:password@ip:554/stream2",
			"stillImageSource": "-i rtsp:// user:password@ip:554/stream2",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 10,
			"maxBitrate": 300,
			"vcodec": "libx264",
			"packetSize": 1316,
			"audio": true,
			"debug": true
		}
	}]
}
```
