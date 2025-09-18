---
title: UNV Uniview
author: iq85k
date: 2020-02-28
---
Model NVR301-04LB-P4
Cameras are UNV IPC2122LR3-PF40-E
NVR Camera Encoding Setup - Menu > Cameras > Encoding

```
Sub Stream
Stream Type Network Transmission
Video Compression h264
Resolution 640*360
Bitrate Type VBR
Bit Rate 512
Frame Rate 10
Image Quality level 4
I Frame Interval 50
Smoothing 4
U-Code Off
```

## config.json

```json
{
	"name": "Front of House",
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://username:password@ipaddress:554/unicast/c1/s1/live",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 10,
		"maxBitrate": 256,
		"mapvideo": "0:0",
		"mapaudio": "0:1",
		"vcodec": "copy",
		"packetSize": 376,
		"audio": false,
		"debug": true
	}
}
```
