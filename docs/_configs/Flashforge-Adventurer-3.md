---
title: Flashforge Adventurer 3
author: Dan Parker
date: 2021-03-08
---
**Homebridge Config**

```json
{
	"name": "Adventurer 3",
	"manufacturer": "Flashforge",
	"model": "Adventurer 3",
	"serialNumber": "1234567890AB",
	"firmwareRevision": "1.2.3",
	"videoConfig": {
		"source": "-f mjpeg -i http://example.com:8080/?action=stream",
		"stillImageSource": "-f mjpeg -i http://example.com:8080/?action=stream -vframes 1 -r 1",
		"maxWidth": 0,
		"maxHeight": 0,
		"maxFPS": 0,
		"debug": false
	}
}
```

**Additional Information**

Likely the same for other Flashforge models with cameras.
