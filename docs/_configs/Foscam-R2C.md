---
title: Foscam R2C
author: shalmi
date: 2021-08-23
---
**Homebridge Config**

```json
{
	"name": "Garage",
	"unbridge": false,
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://USERNAME:PASSWORD@10.0.0.104:88/videoSub",
		"maxBitrate": 1000,
		"audio": true,
		"stillImageSource": "-i http://10.0.0.104:88/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=USERNAME&pwd=PASSWORD&",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 30
	}
}
```

**Additional Information**

I chose the sub stream. I VERY much doubt that matters. what does matter is the stream settings. On the camera itself, I set the settings for substream to:

```
Stream Type: User Defined
Resolution: VGA(640x480)
Bit Rate: 512k
Frame Rate: 15
Key Frame Interval: 10
```

Those settings are IMPORTANT and are what made this work. I used the app "Foscam VMS" to set those settings on the camera

Obviously you should change out USERNAME for your username to the cam and PASSWORD for your PASSWORD, as well as changing the ip and port if need be.
