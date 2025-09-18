---
title: Sercomm OC810
author: cinsu
date: 2020-09-19
---
**Homebridge Config**

```json
{
	"name": "Camera FFmpeg",
	"cameras": [{
		"name": "Camera",
		"motion": true,
		"videoConfig": {
			"source": "-i rtsp://administrator@[ip]:1025/img/media.sav",
			"stillImageSource": "http://administrator@[ip]/img/snapshot.cgi",
			"maxStreams": 2,
			"maxWidth": 640,
			"maxHeight": 480,
			"maxFPS": 15,
			"audio": true
		}
	}]
}
```

**Additional Information**

Default video size is 320x240 which I’ve increased. There are reports some Sercomm models support 720 with a hidden api call but that did not work for this model. I’ve been testing the ffmpeg audio return without success. The parameter is http://[ip]/img/g711a.cgi 
