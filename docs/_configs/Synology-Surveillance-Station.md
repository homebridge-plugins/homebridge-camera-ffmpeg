---
title: Synology Surveillance Station
author: Marc GUYARD
date: 2020-03-01
---
For Synology Surveillance Station
Link for source and stillImageSource are generate by Surveillance Station, right clic on camera and select "Share streaming Path"

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Camera-Salon",
		"videoConfig": {
			"source": "-rtsp_transport tcp -re -i rtsp://USER:PASS@IP:554/Sms=CAMID.unicast",
			"stillImageSource": "-rtsp_transport tcp -re -i rtsp://USER:PASS@IP:554/Sms=CAMID.unicast -updatefirst",
			"maxStreams": 2,
			"maxWidth": 2688,
			"maxHeight": 1520,
			"maxFPS": 20,
			"vcodec": "h264"
		}
	}]
}
```
