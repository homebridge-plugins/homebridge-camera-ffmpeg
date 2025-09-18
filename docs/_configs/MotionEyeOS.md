---
title: MotionEyeOS
author: Normen Hansen
date: 2018-03-02
---
This config reads images from a remote computer (e.g. Raspberry Pi) running [MotionEyeOS](https://github.com/ccrisan/motioneyeos) with default settings, using an IP of 192.168.2.26. If you use MotionEyeOS' _fast network camera_ feature, then you need to change the stillImageSource to the appropriate URL.

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "MotionEyeOS",
		"videoConfig": {
			"source": "-re -f mjpeg -i http://192.168.2.26:8081",
			"stillImageSource": "-f mjpeg -i http://192.168.2.26/picture/1/current/",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 800,
			"maxFPS": 10
		}
	}]
}
```
