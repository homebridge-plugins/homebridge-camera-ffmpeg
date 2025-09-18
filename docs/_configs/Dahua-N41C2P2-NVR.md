---
title: Dahua N41C2P2 NVR
comment: with N42BJ62 5MP Camera
author: jonsem2
date: 2021-03-09
---
**Homebridge Config**

```json
{
	"name": "FrontDoor",
	"videoConfig": {
		"source": "-i rtsp://admin:password@192.168.1.108:554/cam/realmonitor?channel=1&subtype=0"
	}
}
```

**Additional Information**

These cameras are connected to a  Dahua POE NVR on a isolated network.  RTSP stream is being reached by going to NVR LAN address.

rtsp://<username>:<password>@<NVRipaddress>:<port>/cam/realmonitor?channel=1@subtype=0
channel:stream channel on NVR;subtype: Code-stream ty[pe, main stream 0, substream 1

rtsp://admin:password@192.168.1.108:554/cam/realmonitor?channel=4&subtype=0
