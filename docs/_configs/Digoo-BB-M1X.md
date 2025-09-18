---
title: Digoo BB-M1X
author: Attila Laszlo
date: 2021-08-13
---
**Homebridge Config**

```json
{
	"name": "Digoo",
	"unbridge": true,
	"videoConfig": {
		"source": "-re -i rtsp://admin:20160404@IPADDRESS:554/onvif1",
		"maxWidth": 1280,
		"maxHeight": 960
	}
}
```

**Additional Information**

I've included the default user and password, but make sure you change it during the setup of your camera.
