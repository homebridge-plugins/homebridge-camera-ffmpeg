---
title: eufy Security eufyCam
author: scrytch
date: 2019-06-23
---
### Description

A wireless camera system that records locally and supports RTSP. Love it! Tested with the original eufyCam not the eufyCam E (but they should work too).

[Product Page](https://www.eufylife.com/)

### config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Back Yard",
		"videoConfig": {
			"source": "-re -i rtsp://192.168.x.x:554/live0",
			"maxStreams": 2,
			"maxWidth": 1920,
			"maxHeight": 1080,
			"videoFilter": "scale=1280:720"
		}
	}]
}
```

### Notes

1. RTSP streams with these cameras only show after the camera senses motion and broadcasts the stream - no way to trigger it from Home app. To get going you'll need to trigger motion by moving in front of the camera.
2. You'll need to have configured RTSP in your iOS app and noted your URL's for each camera. Instructions for RTSP setup are here - just ignore the NAS part <https://community.anker.com/t/how-to-setup-rtsp-on-eufycam-to-stream-video-to-your-compatible-nas/64833>
