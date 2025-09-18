---
title: EZVIZ Mini Plus
author: TheRealGreatOldOne
date: 2018-09-30
---
[Product Page](https://www.ezvizlife.com/uk/product/mini-plus/916)

Great little cams - small, unobtrusive with good pic and great low light / IR capability. Not expensive either. Oh and 5Ghz wifi compatible. Add the cameras in the EZVIZ application downloaded from the app store, so that you can register them on them on your network, and change any settings required. Untick any cloud trials etc etc.

Camera password is the 6 character verification code printed on the back of each camera.

### config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "YOUR CAMERA NAME",
		"videoConfig": {
			"source": "-rtsp_transport tcp -vcodec h264_mmal -i rtsp://admin:password@nn.nn.nn.nn/Streaming/Channels/1",
			"stillImageSource": "-i rtsp://admin:password@nn.nn.nn.nn/Streaming/Channels/1/picture",
			"maxStreams": 2,
			"maxWidth": 1920,
			"maxHeight": 1080,
			"maxBitrate": 500,
			"vcodec": "h264_omx",
			"maxFPS": 15,
			"audio": true,
			"packetSize": 564
		}
	}]
}
```
