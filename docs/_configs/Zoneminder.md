---
title: Zoneminder
author: Thomas Hentschel
date: 2018-04-20
---
works pretty well with zoneminder, using the ZM 'nph-zms' urls. Since the stream is already "cleaned up", it's pretty fast starting the stream as well. If you have a decent zoneminder setup (on a beefy server, since you need that anyway for motion detection), just run homebridge-camera-ffmpeg straight there.

## config.json

```json
{
	"name": "Sideyard Cam",
	"videoConfig": {
		"source": "-re -i http://localhost/zm/cgi-bin/nph-zms?mode=jpeg&monitor=<zm monitor id>&scale=100&maxfps=15&buffer=1000&user=<zm user>&pass=<zm passwd>",
		"stillImageSource": "-i http://localhost/zm/cgi-bin/nph-zms?mode=single&monitor=<zm monitor id>&scale=100&user=<zm user>&pass=<zm passwd>",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 15,
		"debug": true
	}
}
```
