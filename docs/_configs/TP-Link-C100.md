---
title: TP-Link C100
author: Jirka
date: 2020-07-07
---
Model C 100

## config.json

```json
{
	"cameras": [{
		"name": "TP-Link Camera C100",
		"manufacturer": "TP-Link",
		"model": "C100",
		"motion": true,
		"videoConfig": {
			"source": "-rtsp_transport http -re -i rtsp://user:password@ip:554/stream1",
			"stillImageSource": "-rtsp_transport tcp -re -i rtsp://user:password@ip:554/stream1",
			"maxStreams": 2,
			"maxWidth": 1024,
			"maxHeight": 576,
			"maxFPS": 10,
			"maxBitrate": 300,
			"vcodec": "h264_omx",
			"packetSize": 188,
			"audio": true,
			"debug": true
		}
	}],
	"platform": "Camera-ffmpeg"
}
```
