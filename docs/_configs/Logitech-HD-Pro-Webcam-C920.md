---
title: Logitech HD Pro Webcam C920
author: cmlpreston
date: 2018-03-08
---
macOS (High Sierra), ffmpeg compiled through macports. Demonstrates use of avfoundation stream. I had to limit the video stream size and frame rate otherwise ffmpeg throws an input/output error.

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "macCam",
		"uploader": true,
		"videoConfig": {
			"source": "-re -f avfoundation -video_size 640x480 -framerate 30 -i 0",
			"stillImageSource": "-re -f avfoundation -video_size 640x480 -framerate 30 -ss 0.9 -i 0 -vframes 1",
			"maxStreams": 2,
			"maxWidth": 640,
			"maxHeight": 480,
			"maxFPS": 30,
			"vcodec": "h264",
			"debug": true
		}
	}]
}
```
