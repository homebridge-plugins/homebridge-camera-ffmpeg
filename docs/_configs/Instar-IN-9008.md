---
title: Instar IN-9008
author: cnbhl
date: 2021-01-27
---
**Homebridge Config**

```json
{
	"name": "camera name",
	"manufacturer": "Instar",
	"model": "IN-9008 Full HD",
	"videoConfig": {
		"source": "-i rtsp://user:password@ddnsadress:554/11",
		"stillImageSource": "https://user:password@ddnsadress:8081/tmpfs/snap.jpg",
		"maxFPS": 25
	}
}
```

**Additional Information**

[Manufacturer](https://www.instar.com/)

See also: <https://wiki.instar.com/en/Outdoor_Cameras/IN-9008_HD/Video_Streaming/>

`user`: the user set during camera setup (I assume to use the guest user)
`password`: the password for the user set during camera setup

<https://wiki.instar.com/en/Web_User_Interface/1080p_Series/System/User/>

`ddnsadress`: DDNS adress (default provided by INSTAR via their DDNS service something like _abcd12.ddns3-instar.de_)
`554`: the port set for RTSP inside the camera (ensure port forwarding)
`8081`: the port set for HTTPS inside the camera (ensure port forwarding)

<https://wiki.instar.com/en/Web_User_Interface/1080p_Series/Network/IP_Configuration/>

`/11`: stream quality, values {/11,/12,/13} (/11 = 1080p)

**Alternate MJPEG-Stream**

An additional MJPEG Stream is also provided by the camera:

http://ddnsadress:80/cgi-bin/hi3510/mjpegstream.cgi?-chn=11&-usr=user&-pwd=password
_(not tested)_
