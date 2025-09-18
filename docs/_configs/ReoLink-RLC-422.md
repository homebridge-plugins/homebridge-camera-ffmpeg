---
title: ReoLink RLC-422
author: t1dals
date: 2019-10-03
---
## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "RLC 422",
		"manufacturer": "Reolink",
		"model": "RLC-422",
		"serialNumber": "XXXXXX",
		"videoConfig": {
			"source": "-rtsp_transport tcp -I rtsp://USER:PASSWORD@XXX.XXX.XXX.XXX:XXX:554/h264Preview_01_main",
			"stillImageSource": "-i http://XXX.XXX.XXX.XXX/cgi-bin/api.cgi?cmd=Snap&channel=0&user=USER&password=PASSWORD",
			"maxStreams": 10,
			"maxWidth": 1920,
			"maxHeight": 1080,
			"maxFPS": 30
		}
	}]
}
```

### Notes

Replace XXX.XXX.XXX.XXX, USER, PASSWORD etc with your values.
