---
title: Amcrest IPM-721W
author: FawziD
date: 2021-06-12
---
**Homebridge Config**

```json
{
	"name": "XXXXXX",
	"manufacturer": "Amcrest",
	"model": "IPM-721W",
	"serialNumber": "AMCXXXXXXXXXXXXXXX",
	"firmwareRevision": "V2.420.AC00.18.R, Build Date: 2020-02-17",
	"unbridge": true,
	"videoConfig": {
		"source": "-rtsp_transport tcp -i rtsp://admin:XXXXXXXX@192.168.2.XXX/cam/realmonitor?channel=1&subtype=00&authbasic=",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 15,
		"maxBitrate": 1024,
		"forceMax": false,
		"vcodec": "libx264 -preset ultrafast",
		"packetSize": 1316,
		"encoderOptions": "-async 1 -vsync 1",
		"audio": true,
		"debug": false
	}
}
```

**Additional Information**

After a LOT of trial and error I finally got this working right !
This Amcrest camera is one of the cheapest PTZ camera available. It's web ui is extremely slow but once it's setup it works fine.

*The most helpful settings:*
- **encoderOptions** which gives the system a little leeway and not freeze frames that are a little out of sync (I think...).
- **rtsp_transport tcp** setting which limits the transport to TCP only so the receiving end doesn't try to reorder packets received out of order with UDP.
- **vcodec** setting; "copy" or "h264_omx" don't allow -preset ultrafast. It ads some load to the processor (about 14% per stream) but I get the stream's startup delay down to less than 5 seconds. 

And with this, it runs absolutely smoothly !

