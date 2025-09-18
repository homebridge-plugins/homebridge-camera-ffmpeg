---
title: UniFi Video G3-Micro
author: gijoecool
date: 2019-07-06
---
### Description

Audio and video working on a Raspberry Pi 3 Model B using the instructions [here](https://github.com/KhaosT/homebridge-camera-ffmpeg/wiki/Raspberry-PI). "source" is from UniFi Protect (medium RTSP URL) hosted on an UniFi Cloud Key G2+ and "stillImageSource" is directly from camera. Connection takes less than 10 seconds.

## config.json

```json
{
	"name": "UniFi-G3-Micro",
	"videoConfig": {
		"source": "-re -rtsp_transport tcp -i rtsp://UNIFI_CLOUD_KEY_G2_IP:PORT/UNIQUE_ID",
		"stillImageSource": "-i http://UNIFI_CAMERA_IP/snap.jpeg",
		"additionalCommandline": "-preset slow -profile:v high -level 4.2 -x264-params intra-refresh=1:bframes=0",
		"vcodec": "h264_omx",
		"audio": true,
		"packetsize": 188,
		"maxStreams": 2,
		"maxWidth": 1024,
		"maxHeight": 576,
		"maxFPS": 20,
		"debug": true,
		"mapvideo": "0:1",
		"mapaudio": "0:0"
	}
}
```
