---
title: ReoLink RLC-410
comment: (Should work with all ReoLink-Cams supporting RTSP)
author: Jonathan Fritz
date: 2019-09-24
---
[example](https://amzn.to/2mhS9mi)

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "ReoLink",
		"videoConfig": {
			"source": "-rtsp_transport tcp -i rtsp://USER:PASSWORD@XXX.XXX.XXX.XXX:XXX/h264Preview_01_main",
			"stillImageSource": "-i http://XXX.XXX.XXX.XXX:XXXX/image.jpeg",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 30
		}
	}]
}
```

### Notes: Replace IPADRESS, PASSWORD etc with your values. Port stays the same for usual. For the stillImageSource I used a motioneyeos implementation, but you can just use a snapshot image of the Reolink camera or don't use stillImageSource (it is optional) You can install omx.
