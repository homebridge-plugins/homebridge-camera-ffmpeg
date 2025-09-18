---
title: Foscam FI9900EP / FI9826P
author: Veldkornet
date: 2018-03-29
---
Working through RTSP on RaspberryPi


## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Camera",
		"videoConfig": {
			"source": "-rtsp_transport tcp -re -i rtsp://username:password@XXX.XXX.XXX.XXX:port/videoSub",
			"stillImageSource": "-i http://username:password@XXX.XXX.XXX.XXX:port/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=username&pwd=password",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 10,
			"maxBitrate": 300,
			"vcodec": "h264_omx",
			"audio": false,
			"packetSize": 1316,
			"debug": false
		}
	}]
}
```

### Notes:

- Replace XXX.XXX.XXX.XXX:port with the IP Address and port, ie: 192.168.0.10:88
- For the source, use either “videoSub” or “videoMain” to select the sub or main stream
- Runs smoothly on a RaspberryPi 2 Model B or RaspberryPi 3 Model B+, with the MPEG-omx codec enabled
- Without the “-rtsp_transport tcp”, the live feed stutters, **so make sure it’s added**
