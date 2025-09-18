---
title: Amcrest AD110
author: LiWhit
date: 2021-01-01
---
**Homebridge Config**

```json
{
	"name": "Front Door",
	"manufacturer": "Amcrest",
	"model": "AD110",
	"serialNumber": "XXXXXXXXXXXXX",
	"motion": true,
	"doorbell": true,
	"switches": true,
	"unbridge": true,
	"videoConfig": {
		"source": "-i rtsp://admin:password@X.X.X.X:554/cam/realmonitor?channel=1&subtype=1",
		"maxWidth": 0,
		"maxHeight": 0,
		"maxFPS": 0,
		"forceMax": true,
		"audio": true
	}
}
```

**Additional Information**

Am unable to get the doorbell and motion sensor to work. Video feed is distorted for a second when opening the camera on the Home app. Audio is fine. No two-way audio
