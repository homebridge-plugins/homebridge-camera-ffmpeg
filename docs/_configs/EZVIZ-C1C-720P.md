---
title: EZVIZ C1C 720P
author: Alberto Mengoli
date: 2020-06-22
---
[Product Page](https://www.ezvizlife.com/uk/product/mini-plus/916)

Everithing just said about the Ezviz mini plus model is true for the C1C but with a 1280x720 pixel resolution.

Camera password is the 6 character verification code printed on the back of each camera, too. Sorry, I haven't found a StillImageSource valid string yet

### config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "CAMERA NAME",
		"videoConfig": {
			"source": "-re -i rtsp://admin:password@nn.nn.nn.nn:554/h264_stream",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"vcodec": "h264_omx"
		}
	}]
}
```
