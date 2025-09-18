---
title: Logitech C270 webcam
author: CodingDog
date: 2020-09-27
---
**Homebridge Config**

```json
{
	"name": "C270",
	"manufacturer": "Logitech",
	"model": "C270",
	"videoConfig": {
		"source": "-re -r 30 -s 1280x720 -f video4linux2 -i /dev/video0",
		"stillImageSource": "-s 1280x720 -f video4linux2 -i /dev/video0",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 720,
		"vcodec": "h264_omx",
		"packetSize": 188,
		"audio": false,
		"debug": false
	}
}
```

**Additional Information**

I tested all of the Logitech configurations and none of them would work except when combining it with the source from the raspberry pi cam v2, maybe mine's just finicky.
