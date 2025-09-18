---
title: Foscam FosBaby
author: shortstop-20
date: 2021-02-17
---
**Homebridge Config**

```json
{
	"name": "Cam1",
	"manufacturer": "FOSCAM",
	"model": "FOSBABY",
	"firmwareRevision": "2.22.2.21_p2",
	"motion": true,
	"unbridge": false,
	"videoConfig": {
		"source": "-i rtsp://username:password@10.0.1.9:88/videoMain",
		"maxBitrate": 1000,
		"audio": true
	}
}
```

**Additional Information**

<https://www.foscam.com/Uploads/usermanual/homecamera/User%20Manual%20for%20FosBaby%20Series_V2.1_English.pdf>
