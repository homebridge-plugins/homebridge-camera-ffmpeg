---
title: DBPOWER MEYE-155303-FBACE
comment: with Raspberry Pi 3 Model B
author: Marci
date: 2020-04-28
---
No rtsp streams available - all via MJPEG...

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "DBPower",
		"videoConfig": {
			"source": "-re -i http://[USER]:[PASSWORD]@ip-address:81/videostream.cgi",
			"stillImageSource": "-i http://ip-address:81/snapshot.cgi?user=[USER]&pwd=[PASSWORD]",
			"maxStreams": 2,
			"maxWidth": 640,
			"maxHeight": 480,
			"maxFPS": 16,
			"vcodec": "h264_omx"
		}
	}]
}
```
