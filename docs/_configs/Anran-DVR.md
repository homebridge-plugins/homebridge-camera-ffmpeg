---
title: Anran DVR
comment: Generic Chinese DVR
author: gilesmartin
date: 2018-12-11
---
This works perfectly with a properly powered computer (my Mac mini i5). I am also having the DVR send motion emails to the smtpsensor plugin. This triggers a motion sensor for the area and immediately sends a homekit notification with a clip from the camera.

DVR system: <https://www.amazon.com/ANRAN-Detection-Surveillance-Security-Recorder/dp/B00JUPFVQE/ref=sr_1_3?ie=UTF8&qid=1485448120&sr=8-3&keywords=anran+dvr>

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
			"name": "Outside Front",
			"videoConfig": {
				"source": "-re -i rtsp://10.0.1.93:554/user=admin&password=XXXXXX&channel=1&stream=0.sdp?real_stream--rtp-caching=100",
				"stillImageSource": "-re -i rtsp://10.0.1.93:554/user=admin&password=XXXXXX&channel=1&stream=1.sdp?real_stream--rtp-caching=100",
				"maxStreams": 2,
				"maxWidth": 1280,
				"maxHeight": 720,
				"maxFPS": 50
			}
		},
		{
			"name": "Outside Rear",
			"videoConfig": {
				"source": "-re -i rtsp://10.0.1.93:554/user=admin&password=XXXXXX&channel=2&stream=0.sdp?real_stream--rtp-caching=100",
				"stillImageSource": "-re -i rtsp://10.0.1.93:554/user=admin&password=XXXXXX&channel=2&stream=1.sdp?real_stream--rtp-caching=100",
				"maxStreams": 2,
				"maxWidth": 1280,
				"maxHeight": 720,
				"maxFPS": 50
			}
		}
	]
}
```
