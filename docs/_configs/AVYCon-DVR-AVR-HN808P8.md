---
title: AVYCon DVR AVR-HN808P8
author: Rob Lawrence
date: 2021-10-13
---
**Homebridge Config**

```json
{
	"name": "Front Entry",
	"videoConfig": {
		"source": "-i rtsp://username:password@xx.xxx.xxx.xxx:554/chID=1&streamType=main&linkType=tcp",
		"maxStreams": 6,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 30
	}
}
```

**Additional Information**

Critical configuration issues on the local streaming unit: 1) must have the most current firmware (here the fw number ends with (8D218). ALSO, must change port settings as follows: RTSP=enabled AND Authentication=basic. The configuration above did not include the still image as I had not turned that on in the NVR unit.
