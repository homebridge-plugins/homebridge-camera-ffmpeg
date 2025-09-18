---
title: Foscam DBW5
author: Wohltemperirte Tapir
date: 2022-01-28
---
**Homebridge Config**

```json
{
	"name": "your-cam-name",
	"manufacturer": "Foscam",
	"model": "DBW5",
	"firmwareRevision": "2.0.2.30",
	"doorbell": true,
	"switches": true,
	"unbridge": true,
	"videoConfig": {
		"source": "-fflags nobuffer -flags low_delay -fflags discardcorrupt -analyzeduration 0 -probesize 2000 -rtsp_transport tcp -i rtsp://changeme-username:changeme-password@changeme-ipaddr:changeme-port/videoMain",
		"stillImageSource": "-i http://changeme-username:changeme-password@changeme-ipaddr:changeme-port/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=changeme-username&pwd=changeme-password",
		"maxStreams": 2,
		"maxWidth": 1920,
		"maxHeight": 1080,
		"maxFPS": 30,
		"maxBitrate": 300,
		"packetSize": 1316,
		"audio": true,
		"debug": false
	}
}
```

**Additional Information**

No two-way audio. Provides video/audio feed from the camera, plus "ring button pressed" alerts with cam shot.

For the ring button to work, you need to:

1. Specify "porthttp" in your Camera-ffmpeg configuratiomn
install Foscam VMS (can't do it from the mobile app), go to your doorbell cam configuration >> settings >> device settings >> detector >> alarm linkage.

2. Insert the following line:
http://<changeme-ipaddr>:<changeme-porthttp>/doorbell?<changeme-your-cam-name-in-homebridge>
