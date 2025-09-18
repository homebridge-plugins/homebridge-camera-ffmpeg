---
title: Raspberry Pi HQ Camera
comment: with Logitech C525 (for sound only)
author: hylkefaber
date: 2021-08-14
---
**Homebridge Config**

```json
{
	"name": "HQ cam",
	"unbridge": true,
	"videoConfig": {
		"source": "-re -f video4linux2 -input_format mjpeg -i /dev/video2 -f alsa -ac 1 -i hw:CARD=C525,DEV=0",
		"stillImageSource": "-f video4linux2 -ss 0.9 -i /dev/video2 -vframes 1",
		"maxStreams": 3,
		"maxFPS": 30,
		"forceMax": false,
		"encoderOptions": "-preset ultrafast -tune zerolatency",
		"audio": true,
		"debug": false
	}
}
```

**Additional Information**

Adding the C525 changes the address of the HQ cam from /dev/video0 to /dev/video2, so keep that in mind!

I did a write-up [on Reddit](https://www.reddit.com/r/homebridge/comments/p45wb5/making_a_baby_cam_with_the_raspberry_pi_hq_cam/).
