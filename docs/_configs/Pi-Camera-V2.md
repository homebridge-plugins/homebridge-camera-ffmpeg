---
title: Pi Camera V2
author: LeJeko
date: 2019-04-06
---
The dedicated [homebridge-rpi-camera](https://github.com/moritzmhmk/homebridge-camera-rpi) plugin makes the ffmpeg process crash for me.

According to [this comment](https://github.com/KhaosT/homebridge-camera-ffmpeg/issues/93#issuecomment-314479017), this adapted config work smoothly.

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Pi Cam",
		"videoConfig": {
			"source": "-re -r 6 -s 1280x720 -f video4linux2 -i /dev/video0",
			"stillImageSource": "-s 1280x720 -f video4linux2 -i /dev/video0",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 6,
			"vcodec": "h264_omx"
		}
	}]
}
```
