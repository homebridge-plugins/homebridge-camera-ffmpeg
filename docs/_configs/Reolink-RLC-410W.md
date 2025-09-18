---
title: Reolink RLC-410W
comment: HOOBS + Raspberry Pi 4
author: resgroupmsr
date: 2018-04-18
---
- 7 cameras working as expected.  Copy vcodec seems smoother but the other option here working fine with ultrafast option chosen

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Camera Driveway Reolink",
		"videoConfig": {
			"source": "-rtsp_transport tcp -re -i rtsp://admin:lola9698@192.168.1.241:554/h264Preview_01_main",
			"stillImageSource": "-i http://192.168.1.241/cgi-bin/api.cgi?cmd=Snap&channel=0&rs=wuuPhkmUCeI9WG7C&user=admin&password=pwd",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 30,
			"maxBitrate": 300,
			"vcodec": "copy",
			"packetSize": 1316,
			"audio": false,
			"debug": true
		}
	}]
}
```
