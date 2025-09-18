---
title: Raspberry Pi NoIR Camera
comment: OV5647 Chip same as Raspberry Pi Camera V1
author: Marco Boerner
date: 2020-12-09
---
**Homebridge Config**

```json
{
	"name": "MYCAM 1",
	"unbridge": true,
	"videoConfig": {
		"source": "-re -f video4linux2 -i /dev/video0",
		"stillImageSource": "-f video4linux2 -ss 0.9 -i /dev/video0 -vframes 1",
		"maxStreams": 2,
		"maxWidth": 1920,
		"maxHeight": 1080,
		"maxFPS": 30,
		"maxBitrate": 2048,
		"forceMax": true,
		"vcodec": "h264_omx",
		"encoderOptions": "-preset ultrafast -tune zerolatency"
	}
}
```

**Additional Information**

- I installed Homebridge following the Pi Zero instructions on Github. Activated the camera using raspi-config. Installed the Homebridge Camera FFmpeg plugin through the Homebridge site. For performance reasons I deactivated the Pi GUI.

- The bitrate set to 2048 greatly increased the quality of the stream. A lower value might still be okay, especially when more users are allowed to stream the video. But 299 is too low and for 1080p unusable in my opinion. The encoderOptions helped also a lot.

- Also I have not managed to get the camera to work in bridged mode, but unbridged is recommended anyways.
