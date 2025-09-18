---
title: Lorex LHV2008
author: icdoo
date: 2020-01-19
---
## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"name": "Camera ffmpeg",
	"cameras": [{
		"name": "CamName",
		"videoConfig": {
			"source": "-i rtsp://username:password@XXX.XXX.XXX.XXX:554/cam/realmonitor?channel=1&subtype=1",
			"maxStreams": 2,
			"maxWidth": 1080,
			"maxHeight": 720,
			"maxFPS": 15
		}
	}]
}
```

### Notes

Replace XXX.XXX.XXX.XXX, etc with your values.
This is the config for the Lorex LHV2008.
