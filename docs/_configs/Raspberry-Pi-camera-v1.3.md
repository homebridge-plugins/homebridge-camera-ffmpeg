---
title: Raspberry Pi camera v1.3
comment: connected to another RasPi
author: Jan Kaiser
date: 2019-08-02
---
## Description

**Raspberry Pi #1:** The one that has camera connected to it

Cron job to create a snapshot every minute (if we are not currently streaming)

`* * * * * /home/pi/latest.sh`

### latest.sh

```sh
#!/bin/sh

if top -b -n1 | grep raspivid; then
	exit 0
else
	raspistill -w 480 -h 270 -o /home/pi/latest.jpg -n -awb auto -ex auto
	exit 0
fi
```

### Command used for streaming

`raspivid -o - -t 0 -w 1280 -h 720 -fps 15 -n -awb auto -ex auto | cvlc -vvv stream:///dev/stdin --sout '#rtp{sdp=rtsp://:8000/live}' :demux=h264`

**Raspberry Pi #2:** The one that runs HomeBridge

Cron job to pull the latest snapshot locally every minute

`* * * * * ssh pi@192.168.1.107 'cat /home/pi/latest.jpg' > /home/pi/latest.jpg`

### config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Balcony Camera",
		"videoConfig": {
			"source": "-f rtsp -re -i rtsp://192.168.1.107:8000/live",
			"stillImageSource": "-i file:///home/pi/latest.jpg",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 15,
			"maxBitrate": 299,
			"audio": false,
			"packetSize": 188
		}
	}]
}
```