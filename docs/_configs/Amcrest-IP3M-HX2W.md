---
title: Amcrest IP3M-HX2W
comment: HOOBS + Raspberry Pi 4
author: resgroupmsr
date: 2020-04-18
---
- 7 cameras working as expected.  Copy vcodec seems smoother but the other option here working fine with ultrafast option chosen

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Camera Living Room Amcrest",
		"videoConfig": {
			"source": "-rtsp_transport tcp -re -i rtsp://user:pwd@192.168.1.221/cam/realmonitor?channel=1&subtype=00&authbasic=YWRtaW46bG9sYTk2OTg=",
			"stillImageSource": "-i http://user:pwd@192.168.1.221/cgi-bin/snapshot.cgi?1",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 15,
			"maxBitrate": 300,
			"vcodec": "libx264 -preset ultrafast",
			"packetSize": 1316,
			"audio": false,
			"debug": true
		}
	}]
}
```
