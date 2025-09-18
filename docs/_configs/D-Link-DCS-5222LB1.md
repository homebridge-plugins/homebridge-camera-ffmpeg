---
title: D-Link DCS-5222LB1
author: EDRENOS
date: 2019-12-26
---
Notes: Replace IPADDRESS XX.XX.XX.XX, USER and PASSWORD with your data.

## config.json

```json
{
	"name": "D-LINK CAMERA",
	"cameras": [{
		"name": "DCS-5222LB",
		"videoConfig": {
			"source": "-rtsp_transport tcp -i rtsp://USER:PASSWORD@XX.XX.XX.XX/live1.sdp",
			"stillImageSource": "-i http://USER:PASSWORD@XX.XX.XX.XX/image/jpeg.cgi",
			"maxStreams": 4,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 30,
			"maxBitrate": 300,
			"vcodec": "h264_omx",
			"packetSize": 564,
			"audio": true,
			"debug": false
		}
	}],
	"platform": "Camera-ffmpeg"
}
```
