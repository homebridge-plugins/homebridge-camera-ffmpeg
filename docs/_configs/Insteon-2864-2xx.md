---
title: Insteon 2864-2xx
comment: older firmware
author: Steve Jensen
date: 2021-01-10
---
**Homebridge Config**

```json
{
	"name": "Laundry Camera",
	"manufacturer": "Insteon",
	"model": "2864-222",
	"firmwareRevision": "2.11.1",
	"motion": false,
	"videoConfig": {
		"source": "-i http://USER:PASS@CAMERA_IP/cgi-bin/CGIStream.cgi?cmd=GetMJStream&usr=USER&pwd=PASS",
		"stillImageSource": "-i http://CAMERA_IP/cgi-bin/CGIProxy.fcgi?usr=USER&pwd=PASS&cmd=snapPicture2",
		"maxStreams": 1,
		"maxWidth": 640,
		"maxHeight": 480,
		"maxFPS": 15,
		"forceMax": true,
		"audio": false
	}
}
```

**Additional Information**

Insteon uses Foscam but has their own software loads.  Certain camera hardware revisions cannot run their latest software and do not have RTSP support, none of the URL's on iSpyConnect work with the older firmware.  So the only option with these very old cameras is to use the GetMJStream command.  You can still use the Insteon App to pan and tilt the camera as needed.  If you have newest firmware, you should be be able to use the URLs on iSpyConnect ( /videoStream.fcgi or RTSP)

You likely will have set the stream format to 1 (MJPEG), at least that's the only way I could get it work properly:

`curl "http://USER:PASS@CAMERA_IP/cgi-bin/CGIProxy.fcgi?cmd=setSubStreamFormat&format=1&usr=USER&pwd=PASS"`

If you want to tinker directly with the Camera via API, see:
<https://www.foscam.es/descarga/Foscam-IPCamera-CGI-User-Guide-AllPlatforms-2015.11.06.pdf>
