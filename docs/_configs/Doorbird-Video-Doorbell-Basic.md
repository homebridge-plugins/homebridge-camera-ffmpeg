---
title: Doorbird Video Doorbell
comment: Basic
author: tommyd75
date: 2017-01-11
---
This works for me, it's for a Doorbird Video Doorbell, which I think uses the same hardware or at least same connection method as a Axis IP camera.

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Front Door Camera",
		"videoConfig": {
			"source": "-re -i http://192.168.1.100:80/bha-api/video.cgi?http-user=username&http-password=password",
			"maxStreams": 2,
			"maxWidth": 640,
			"maxHeight": 480,
			"maxFPS": 3
		}
	}]
}
```
