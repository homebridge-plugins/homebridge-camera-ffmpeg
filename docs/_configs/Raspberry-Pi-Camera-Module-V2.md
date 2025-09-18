---
title: Raspberry Pi Camera Module V2
comment: and Raspberry PI Zero W (Jessie)
author: XavM
date: 2017-08-17
---
I had to build ffmpeg with "--enable-libx264" to be able to use the "-tune zerolatency" from ffmpeg.js, and with "--enable-omx" and "--enable-omx-rpi" to use the GPU encoding

I had to remove from the homebridge-camera-ffmpeg code (ffmpeg.js) the resolution and scale for stillImage and videoStream to switch back to GPU encoding, and I now get a decent 10~20 FPS with pretty good video quality and ffmpeg using ~12% CPU on the pi zero

Still image sometimes don't refresh in homekit App : Need to reboot the iPhone to get it back ...

## config.json (credits [@GeorgViehoever ](https://github.com/KhaosT/homebridge-camera-ffmpeg/issues/22))

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "piCam",
		"uploader": false,
		"videoConfig": {
			"source": "-re -f video4linux2 -i /dev/video0",
			"stillImageSource": "-re -f video4linux2 -ss 0.9 -i /dev/video0 -vframes 1",
			"maxStreams": 2,
			"maxWidth": 1920,
			"maxHeight": 1080,
			"maxFPS": 30,
			"vcodec": "h264_omx"
		}
	}]
}
```
