---
title: Sercomm iCamera2
author: John Fox
date: 2022-03-14
---
**Homebridge Config**

```json
{
	"name": "<Camera Location Name>",
	"manufacturer": "Sercomm",
	"model": "iCamera2",
	"serialNumber": "<Camera Serial Here>",
	"videoConfig": {
		"source": "-i rtsp://administrator@<Camera IP>:554/img/media.sav",
		"stillImageSource": "http://administrator@<Camera IP>:554/img/snapshot.cgi",
		"audio": true
	}
}
```

**Additional Information**

There are some additional parameters you'll need to set in the Camera firmware itself through your browser to ensure Wi-Fi connectivity:

1. Set SSID: http://<Your Camera IP>/adm/get_group.cgi?group=WIRELESS&wlan_essid=<Your Wireless Network Name>

2. Set WLAN Password: http://<Your Camera IP>/adm/get_group.cgi?group=WIRELESS&wpa_ascii=<Your Wireless Network Name>

Please note that when setting your iCam2's up through Homebridge you will lose the ability for CVR through Xfinity Home and you will not be able to access your cameras through the Xfinity Home touchscreen or mobile app. All access will be through Apple HomeKit.
