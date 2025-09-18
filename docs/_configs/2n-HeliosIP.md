---
title: 2n HeliosIP
author: hihipto
date: 2020-10-14
---
**Homebridge Config**

```json
{
	"name": "Doorbell",
	"manufacturer": "2n",
	"model": "HeliosIP",
	"serialNumber": "1234",
	"doorbell": true,
	"videoConfig": {
		"source": "-i rtsp://IPaddress:554/h264_stream",
		"stillImageSource": "-i http://IPaddress/enu/camera640x480.jpg",
		"maxWidth": 640,
		"maxHeight": 480,
		"maxBitrate": 512,
		"forceMax": true,
		"audio": false
	}
}
```

**Additional Information**

Automation is required to enable the doorbell function:
![](https://user-images.githubusercontent.com/5295141/96009114-8e1ea180-0e40-11eb-986f-559e9f783152.png)

Not sure "Enhanced Video License" is required for streaming video:
![](https://user-images.githubusercontent.com/5295141/96009267-c0300380-0e40-11eb-806d-2c9d1ca11a2c.png)
