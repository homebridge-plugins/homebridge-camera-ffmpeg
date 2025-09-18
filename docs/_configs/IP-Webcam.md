---
title: IP Webcam
comment: running on an older Samsung Smartphone and Raspberry PI 2 (Jessie)
author: NorthernMan54
date: 2017-02-05
---
To resolve playback issues I had to use the OMX fork to get the PI 2 and FFMPEG to work more or less reliably.
<https://github.com/legotheboss/homebridge-camera-ffmpeg-omx>

## Camera Settings

    Video Resolution: 1920x1080
    Photo Resolution: 2048x1152

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Front Porch Camera",
		"videoConfig": {
			"source": "-f mjpeg -i http://alice:8080/video",
			"stillImageSource": "-i http://alice:8080/shot.jpg",
			"maxStreams": 2,
			"maxWidth": 1920,
			"maxHeight": 1080,
			"maxFPS": 30
		}
	}]
}
```
