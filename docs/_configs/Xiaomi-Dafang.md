---
title: Xiaomi Dafang
comment: with Raspberry Pi 3 Model B
author: Partyboy97
date: 2018-05-13
---
Note: [Dafang-Hacks](https://github.com/EliasKotlyar/Xiaomi-Dafang-Hacks) Enable the RTSP stream.

Reduced the RTSP output to 720p which is helpful when your Wi-Fi link is not great.
Remove the "-rtsp_transport tcp" if you got FFMpeg Zombie's

I run this config for my 3 Cams.

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Camera 1",
		"videoConfig": {
			"source": "-rtsp_transport tcp -i rtsp://ip-address/unicast",
			"stillImageSource": "-rtsp_transport tcp -i rtsp://ip-address/unicast -vframes 1 -r 1",
			"maxStreams": 5,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 25,
			"vcodec": "h264_omx"
		}
	}]
}
```
