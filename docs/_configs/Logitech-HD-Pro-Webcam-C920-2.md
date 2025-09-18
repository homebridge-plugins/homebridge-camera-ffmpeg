---
title: Logitech HD Pro Webcam C920
comment: w/ Raspberry Pi
author: Manuel Gottstein
date: 2018-12-19
---
I set up a Rpi1 with the camera and stream using [v4l2rtspserver](https://github.com/mpromonet/v4l2rtspserver).
Install a webserver (Apache / I use Lighttpd) and use this command to take a screenshot every 5 seconds from the stream for faster still image captures (also running on the pi1):

`ffmpeg -f rtsp -vcodec h264_mmal -i rtsp://127.0.0.1:8555/unicast -vf fps=fps=1/5 -f image2 -update 1 /var/www/html/latest.jpg`

Transcoding happens on a Rpi3. You might get everything to work on one Rpi3.
Results in delay of about 50-200ms,
Video takes ~10 Seconds to start streaming due to h264_mmal and h264_omx, hangs sometimes.

With Audio:
`v4l2rtspserver -c -Q 512 -s -F 0 -H 720 -W 1280 -I 0.0.0.0 -P 8555 -A 32000 -C 2 /dev/video0,plughw:CARD=C920`

Video Only:
`v4l2rtspserver -c -Q 512 -s -F 0 -H 720 -W 1280 -I 0.0.0.0 -P 8555 /dev/video0`

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "C920",
		"videoConfig": {
			"source": "-f rtsp -vcodec h264_mmal -i rtsp://rpi:8555/unicast",
			"stillImageSource": "-i http://rpi/latest.jpg",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 30,
			"maxBitrate": 300,
			"vcodec": "h264_omx",
			"audio": true,
			"packetSize": 188,
			"debug": false
		}
	}]
}
```
