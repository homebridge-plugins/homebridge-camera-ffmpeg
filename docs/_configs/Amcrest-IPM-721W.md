---
title: Amcrest IPM-721W
author: FawziD
date: 2020-09-19
---
**Homebridge Config**

```json
{
	"name": "Cam1",
	"manufacturer": "Amcrest",
	"model": "IPM-721W",
	"serialNumber": "XXXXXXXXXX",
	"firmwareRevision": "V2.420.AC00.18.R, Build Date: 2020-02-17",
	"motion": true,
	"unbridge": true,
	"videoConfig": {
		"source": "-i rtsp://admin:####@192.168.2.99/cam/realmonitor?channel=1&subtype=0",
		"maxStreams": 2,
		"maxWidth": 0,
		"maxHeight": 0,
		"maxFPS": 15,
		"maxBitrate": 1024,
		"vcodec": "h264_omx",
		"packetSize": 188,
		"encoderOptions": "-preset ultrafast -tune zerolatency",
		"audio": true,
		"debug": false
	}
}
```

**Additional Information**

- Works ok on an old Raspberry pi 2 with this sub 50$ camera. I've fiddled quite a long while to get to this. There are a few skipped frames here and there but otherwise works fine.

- The widget view in HomeKit shows only snapshots every 10 seconds in iOS and doesn't work at all in MacOS. But full screen view on iOS, TVOS, iPadOS and MacOS shows a live feed (with sound) reliably.

- Hardware h264 decoding works fine, although each individual stream adds 25~30% load on the CPU. 
And I've set the camera itself to 15fps, high quality and a 1024 bitrate which seemed to help also.
