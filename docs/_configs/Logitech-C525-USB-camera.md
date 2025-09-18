---
title: Logitech C525 USB camera
comment: and Raspberry Pi 3
author: Miquel Sanz Alcántara
date: 2019-12-08
---
This configuration works with synchronized video/audio:

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Logitech-C525",
		"videoConfig": {
			"source": "-f alsa -ac 1 -ar 44100 -thread_queue_size 2048 -i plughw:CARD=C525,DEV=0 -re -f video4linux2 -i /dev/video0 -vsync 0 -af aresample=async=1",
			"stillImageSource": "-s 1280x720 -f video4linux2 -i /dev/video0",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 30,
			"audio": true,
			"debug": true,
			"packetSize": 188,
			"mapvideo": "1",
			"mapaudio": "0"
		}
	}]
}
```
