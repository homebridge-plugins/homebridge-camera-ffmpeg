---
title: iPCamera - High-End NetworkCam (iOS App)
author: kalebakeits
date: 2021-05-16
---
**Homebridge Config**

```json
{
	"name": "Bedroom View",
	"videoConfig": {
		"source": "-i http://10.211.xxx.xxx/live",
		"stillImageSource": "-i http://10.211.xxx.xxx/live",
		"maxStreams": 2,
		"maxWidth": 480,
		"maxHeight": 360,
		"maxFPS": 30
	}
}
```

**Additional Information**

You don't need to specify a port for this camera just http://{camera ip}/live. I am using mine without a password at the moment so I cannot advise on that. I know it is risky.
