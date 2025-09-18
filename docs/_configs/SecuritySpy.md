---
title: SecuritySpy
comment: for MacOs
author: Tom Hickey
date: 2018-06-17
---
[Product page](https://www.bensoftware.com/securityspy/)

The great thing about this is, if SecuritySpy supports your camera ([which is an extensive list](https://www.bensoftware.com/securityspy/helpcameralist.html)) then you should be able to get it working within Homebridge. So you can add multi-random cameras and only have to worry about getting the config right once.

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
			"name": "Security Cam 0",
			"videoConfig": {
				"source": "-i http://<SecurityspyUsername>:<SecurityspyPassword>@<SecurityspyIP>:<SecurityspyPort>/++hls?cameraNum=0&codec=h264&width=1280&height=720",
				"stillImageSource": "-i http://<SecurityspyUsername>:<SecurityspyPassword>@<SecurityspyIP>:<SecurityspyPort>/++image?cameraNum=0&width=480&height=270",
				"maxStreams": 2,
				"maxWidth": 1280,
				"maxHeight": 720,
				"maxFPS": 30
			}
		},
		{
			"name": "Security Cam 1",
			"videoConfig": {
				"source": "-i http://<SecurityspyUsername>:<SecurityspyPassword>@<SecurityspyIP>:<SecurityspyPort>/++hls?cameraNum=1&codec=h264&width=1280&height=720",
				"stillImageSource": "-i http://<SecurityspyUsername>:<SecurityspyPassword>@<SecurityspyIP>:<SecurityspyPort>/++image?cameraNum=1&width=480&height=270",
				"maxStreams": 2,
				"maxWidth": 1280,
				"maxHeight": 720,
				"maxFPS": 30
			}
		}
	]
}
```
