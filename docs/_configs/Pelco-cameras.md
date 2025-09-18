---
title: Pelco cameras
author: Klangen82
date: 2017-03-25
---
Working through RTSP

Pelco cameras have two streams `rtsp//camera-ip/stream1` and `rtsp//camera-ip/stream2` In my example below I use a Sarix Pro IBP519 and use the second stream from the camera. I have configured the stream to be 640x480 and 12ips but in the config.json you see that I use 30ips and this is that HomeBridge working this way. I took my second camera IME219 and to get the jpeg to work in this I needed to change the `stillImageSource` to be `-f mjpeg -i http://192.168.5.33/jpeg`

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Baksidan",
		"videoConfig": {
			"source": "-re -i rtsp://192.168.5.34/stream2",
			"stillImageSource": "-i http://192.168.5.34/jpeg",
			"maxStreams": 2,
			"maxWidth": 640,
			"maxHeight": 480,
			"maxFPS": 30
		}
	}]
}
```
