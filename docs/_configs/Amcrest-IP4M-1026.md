---
title: Amcrest IP4M-1026
author: Larry Davis
date: 2020-05-06
---
## config.json

```json
{
	"platforms": [{
		"platform": "Camera-ffmpeg",
		"cameras": [{
			"name": "CAMERANAME",
			"manufacturer": "Amcrest",
			"model": "IP4M-1026",
			"videoConfig": {
				"source": "-rtsp_transport tcp -re -i rtsp://admin:PASSWORD@IPADDRESS:554/cam/realmonitor?channel=1&subtype=0",
				"stillImageSource": "-i http://admin:PASSWORD@IPADDRESS/cgi-bin/snapshot.cgi?chn=1",
				"maxStreams": 2,
				"maxWidth": 2688,
				"maxHeight": 1520,
				"maxFPS": 30,
				"maxBitrate": 2048,
				"vcodec": "libx264 -preset ultrafast",
				"packetSize": 1316,
				"audio": false,
				"debug": false
			}
		}]
	}]
}
```
