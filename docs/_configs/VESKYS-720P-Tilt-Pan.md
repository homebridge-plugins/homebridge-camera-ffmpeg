---
title: VESKYS 720P Tilt / Pan
author: Charles Vestal
date: 2017-05-13
---
[example](http://www.ebay.com/itm/292036336237?_trksid=p2060353.m2749.l2649&ssPageName=STRK%3AMEBIDX%3AIT)

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Veskys Camera",
		"videoConfig": {
			"source": "-rtsp_transport tcp -i rtsp://admin:PASSWORD@IPADDRESS:10554/tcp/av0_0 -map 0",
			"stillImageSource": "-i http://IPADDRESS:81/snapshot.cgi?user=admin&pwd=PASSWORD",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 30
		}
	}]
}
```

### Notes: Replace IPADDRESS, PASSWORD with your data. I could not get this working with RPi and ffmpeg-omx, but working successfully on a macOS installation
