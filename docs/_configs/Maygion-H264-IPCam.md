---
title: Maygion H264 IPCam
comment: (Software Version H.264 6.40) with Raspberry Pi 3 Model B
author: Marci
date: 2018-01-28
---
MPEG Snapshot & RTSP Stream

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Maygion",
		"videoConfig": {
			"source": "-re -i rtsp://[USER]:[PASSWORD]@ip-address:81/videostream.cgi",
			"stillImageSource": "-i http://ip-address:81/snapshot.cgi?user=[USER]&pwd=[PASSWORD]",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 16,
			"vcodec": "h264_omx"
		}
	}]
}
```
