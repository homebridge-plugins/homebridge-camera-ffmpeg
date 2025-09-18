---
title: Foscam IQ200
author: redelva
date: 2017-03-23
---
Working through RTSP

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Camera",
		"videoConfig": {
			"source": "-re -i rtsp://username:password@192.168.31.51:88/videoMain",
			"stillImageSource": "-i http://username:password@192.168.31.51:88/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=username&pwd=password&",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 30
		}
	}]
}
```
