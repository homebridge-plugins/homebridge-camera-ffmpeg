---
title: AirBeam iOS App
comment: on iPhone 5C running iOS 10.3
author: lazymoose5
date: 2021-08-22
---
**Homebridge Config**

```json
{
	"name": "iphone5",
	"manufacturer": "Apple",
	"model": "iPhone 5C",
	"videoConfig": {
		"source": "-i http://192.168.3.8/service/camera/video.mjpeg",
		"maxStreams": 2,
		"maxWidth": 0,
		"maxHeight": 0,
		"maxFPS": 0,
		"audio": false,
		"debug": true
	}
}
```

**Additional Information**

Video framerate and quality are set in the Air Beam app.

I am using the Homebridge plugin in TrueNAS 12. Installation of ffmpeg through the shell made it work - as it was not available in the jail by default, use `pkg install ffmpeg`
