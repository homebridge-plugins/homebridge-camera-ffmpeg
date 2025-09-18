---
title: Szsinocam ip onvif
author: Jony
date: 2020-06-30
---
- using homebridge-camera-ffmpeg
- authentication for rtsp disabled in camera config

```json
{
	"cameras": [{
		"name": "Camera",
		"manufacturer": "SZSINOCAM",
		"model": "IPCAM",
		"motion": false,
		"videoConfig": {
			"source": "-rtsp_transport tcp -re -i rtsp://192.168.1.50:554/ucast/11",
			"stillImageSource": "-re -i http://192.168.1.50/cgi-bin/anv/images_cgi?channel=0",
			"maxFPS": 20,
			"debug": false
		}
	}],
	"platform": "Camera-ffmpeg"
}
```
