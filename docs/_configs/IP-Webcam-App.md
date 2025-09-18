---
title: IP Webcam App
comment: by Pavel Khlebovich
author: Bernd Gewehr
date: 2019-11-15
---
Working through http

## config.json

```json
{
	"name": "Bedroom",
	"videoConfig": {
		"source": "-re -i http://src/video -i http://src/audio.opus",
		"stillImageSource": "-i http://src/shot.jpg",
		"maxStreams": 2,
		"maxWidth": 640,
		"maxHeight": 480,
		"maxFPS": 30,
		"audio": true,
		"mapvideo": "0",
		"mapaudio": "1"
	}
}
```
