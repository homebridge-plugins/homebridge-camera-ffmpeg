---
title: Bosch Security Cameras
author: chrkan
date: 2022-01-05
---
**Homebridge Config**

```json
{
	"name": "Tinyion",
	"manufacturer": "Bosch",
	"model": "TINYON IP 2000 WI",
	"serialNumber": "00000",
	"firmwareRevision": "7.10.0095",
	"motion": true,
	"doorbell": true,
	"switches": true,
	"motionDoorbell": false,
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://live:PW@IP-Adress/?h26x=4",
		"stillImageSource": "-i http://live:PW@IP-Adress/snap.jpg",
		"forceMax": true,
		"mapvideo": "rtsp://live:PW@IP-Adress/?h26x=4",
		"audio": false,
		"debug": false
	}
}
```

**Additional Information**

More Stream Information can added by using the RTSP usage with Bosch VIP Devices document:
https://resources-boschsecurity-cdn.azureedge.net/public/documents/RTSP_VIP_Configuration_Note_enUS_9007200806939915.pdf
