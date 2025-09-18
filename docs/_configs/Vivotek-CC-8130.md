---
title: Vivotek CC-8130
comment: and Raspberry PI 2 (Jessie)
author: NorthernMan54
date: 2017-02-05
---
To resolve playback issues I had to use the OMX fork to get the PI 2 and FFMPEG to work more or less reliably.
<https://github.com/legotheboss/homebridge-camera-ffmpeg-omx>

## Camera Settings

    the settings for Media->Video->Stream 2 to
      JPEG
      Frame Size 1280x800
      Maximum frame rate 30
      Video Quality: Fixed
      Video Quality: Excellent
      Maximum bit rate 40 Mbps

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Office Camera",
		"videoConfig": {
			"source": "-re -i http://login:password@192.168.1.98/video2.mjpg",
			"stillImageSource": "-f mjpeg -i http://login:password@192.168.1.98/cgi-bin/viewer/video.jpg",
			"maxStreams": 2,
			"maxWidth": 1920,
			"maxHeight": 1080,
			"maxFPS": 30
		}
	}]
}
```
