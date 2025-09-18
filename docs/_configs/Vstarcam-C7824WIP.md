---
title: Vstarcam C7824WIP
author: teymur1988
date: 2020-07-15
---
- using homebridge-camera-ffmpeg 2.3.0
- authentication for rtsp admin and camera password

```json
{
	"name": "Entrance Camera",
	"motion": true,
	"switches": false,
	"motionTimeout": 35,
	"videoConfig": {
		"source": "-rtsp_transport udp -i rtsp://admin:yourpassword@cam-ip:10554/udp/av0_0",
		"stillImageSource": "-i http://cam-ip/img/snapshot.cgi?user=admin&pwd=yourpassword&res=0",
		"maxFPS": 25,
		"packetSize": 1316,
		"audio": true,
		"debug": false
	}
}
```
