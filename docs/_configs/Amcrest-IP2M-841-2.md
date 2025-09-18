---
title: Amcrest IP2M-841
author: kelmers
date: 2021-02-28
---
This is to get IP2M-841 cameras streaming to homekit in 1080p, via transcode on a mac, with h264_videotoolbox.

**Homebridge Config**

```json
{
	"name": "Driveway",
	"unbridge": true,
	"videoConfig": {
		"source": "-i rtsp://user:password@IPADDRESS:554/cam/realmonitor?channel=1&subtype=0",
		"stillImageSource": "-i http://user:password@IPADDRESS/cgi-bin/snapshot.cgi?1",
		"maxStreams": 2,
		"maxWidth": 1920,
		"maxHeight": 1080,
		"maxFPS": 30,
		"maxBitrate": 8192,
		"forceMax": true,
		"vcodec": "h264_videotoolbox",
		"audio": true
	}
}
```

**Additional Information**

To get this working right, login to amcrest web portal for camera to change stream settings. Then click camera and then video (both on left pane).
Under main stream settings, change:

- Encode mode: H.264H
- Smart Codec OFF
- resolution 1920x1080
- FPS 30
- Bit rate : VBR
- Quality 6 Best
- Max bit rate 8192
- Frame Interval 60

Then click save.