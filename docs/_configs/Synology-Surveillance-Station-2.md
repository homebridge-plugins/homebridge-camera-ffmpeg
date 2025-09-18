---
title: Synology Surveillance Station
author: Malcolm Hall
date: 2020-06-13
---
When using Surveillance Station to connect and record the camera there is no point in homebridge also connecting when it can simply connect to Surveillance Station's shared stream locally. Find the URL in Surveillance Station, IP Camera, right click camera, share stream path. By default this plugin is set to re-encode the video stream but that is a serious problem because the Alpine docker container cannot do hardware encoding of the video so when viewing the stream through the home app it destroys the Synology's CPU as it does software encoding. Since the Surveillance Station stream is already h264 the solution is for this plugin to just forward the existing stream and not re-encode it, that is done by setting the vcodec to copy.

## config.json

```json
{
	"platforms": [{
		"cameras": [{
			"name": "My Camera",
			"videoConfig": {
				"source": "-re -i rtsp://syno:1234567890abcdef1234567890abcdef@localhost:554/Sms=1.unicast",
				"maxWidth": 1920,
				"maxHeight": 1080,
				"maxFPS": 30,
				"maxBitrate": 3000,
				"vcodec": "copy",
				"audio": true
			}
		}],
		"platform": "Camera-ffmpeg"
	}]
}
```
