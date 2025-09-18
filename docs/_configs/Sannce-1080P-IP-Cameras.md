---
title: Sannce 1080P IP Cameras
author: Ricardo Pereira
date: 2017-02-04
---
Purchased as a set of 4 with an NVR (no HD), available on [Amazon.ca](https://www.amazon.ca/gp/product/B01ABRSM8S/ref=oh_aui_detailpage_o09_s00?ie=UTF8&psc=1) (Model POE-1080P-4CH)

## config.json

```json
{
	"name": "Sannce",
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://192.168.1.100/user=name_password=pass_channel=1_stream=0.sdp?real_stream",
		"maxStreams": 2,
		"maxWidth": 1920,
		"maxHeight": 1080,
		"maxFPS": 30
	}
}
```

### Notes:

- The IP address can be the cameras themselves, or the NVR.
	- You can specify different cameras from the NVR IP by incrementing the `channel` number.
- Adding the `-rtsp_transport tcp` option greatly improved the video performance and quality for me.
	- Without it, stream would take a long time to load, stutter frequently, and would often be covered in streaks and artifacts.
	- Anyone looking to improve the output of similar IP cameras should also look at ffmpeg's [RTSP-specific options](http://ffmpeg.org/ffmpeg-protocols.html#rtsp)
- I found that the quality of the stream would suffer when multiple devices were streaming straight from the cameras/NVR, so I've set up an [RTSP proxy](http://www.live555.com/proxyServer/) on the same machine running `homebridge-camera-ffmpeg`
- I'm running `homebridge-camera-ffmpeg` and its own instance of `homebridge` in a docker container using the [`marcoraddatz/homebridge`](https://hub.docker.com/r/marcoraddatz/homebridge/) image.
	- This required installing ffmpeg from the `jessie-backports` apt source inside the container.
