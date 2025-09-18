---
title: Samsung SNH-P6410BN
comment: Samsung SmartCam (firmware 1.08) and Raspberry PI 3
author: pponce
date: 2017-01-31
---
I had to use the OMX fork to get the PI 3 and FFMPEG to work more or less reliably.
<https://github.com/legotheboss/homebridge-camera-ffmpeg-omx>

## Camera Settings

I disabled WDR on the camera via the iOS app to get better frame rates at higher quality for my BlueIris setup using profile 5.

rtsp://username:password@IPAddress:554/profile5/media.smp

For the PI 3 I ended up using profile 2.

rtsp://username:password@IPAddress:554/profile2/media.smp

If you don't use the HD quality profile 5 or don't need/want higher frame rates when using it then you can experiment with WDR ON or OFF for your setup.

There are also other profiles to try:
rtsp://username:password@IPAddress:554/profile3/media.smp
rtsp://username:password@IPAddress:554/profile4/media.smp
rtsp://username:password@IPAddress:554/profile6/media.smp

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "CamNameHere",
		"videoConfig": {
			"source": "-re -i rtsp://username:password@ipaddress:554/profile2/media.smp",
			"maxStreams": 2,
			"maxWidth": 640,
			"maxHeight": 360,
			"maxFPS": 15
		}
	}]
}
```
