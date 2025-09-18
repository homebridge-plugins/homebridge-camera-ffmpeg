---
title: Xiaomi Xiaofang
comment: (Small White Square) with Raspberry Pi 3 Model B
author: mrblack7
date: 2018-05-26
---
Note: I applied [Fang-Hacks](https://github.com/samtap/fang-hacks) to the camera to enable the RTSP stream.

I also reduced the RTSP output to 720p which is helpful when your Wi-Fi link is not great.

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Camera 1",
		"videoConfig": {
			"source": "-rtsp_transport tcp -i rtsp://ip-address/unicast",
			"stillImageSource": "-i rtsp://ip-address/unicast -vframes 1 -r 1",
			"maxStreams": 2,
			"maxWidth": 720,
			"maxHeight": 480,
			"maxFPS": 10,
			"vcodec": "h264_omx"
		}
	}]
}
```
