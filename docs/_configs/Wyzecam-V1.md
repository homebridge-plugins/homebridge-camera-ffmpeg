---
title: Wyzecam V1
comment: with Raspberry Pi 3 Model B Rev 1.2
author: Karan S
date: 2018-05-29
---
Replica of the Xiaomi Xiaofang (Small White Square)

Note: I used the homebridge-camera-ffmpeg-omx plugin (<https://github.com/legotheboss/homebridge-camera-ffmpeg-omx>) along with OpenIPC v0.2.4 for Wyze V1 (<https://github.com/openipcamera/openipc-firmware>) which is forked from Fang-Hacks(<https://github.com/samtap/fang-hacks>)

The rest of the `config.json` file is similar to the above Xioami Xiaofang `config.json`

## config.json

```json
{
	"platform": "Camera-ffmpeg-omx",
	"cameras": [{
		"name": "Garage Camera",
		"videoConfig": {
			"source": "-re -i rtsp://192.168.2.128/unicast",
			"stillImageSource": "-i rtsp://192.168.2.128/unicast -vframes 1 -r 1",
			"maxStreams": 2,
			"maxWidth": 1920,
			"maxHeight": 1080,
			"maxFPS": 30
		}
	}]
}
```
