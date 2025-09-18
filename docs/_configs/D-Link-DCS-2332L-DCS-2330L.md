---
title: D-Link DCS-2332L/DCS-2330L
author: pkempe
date: 2018-05-20
---
Works for both DCS-2332L and DCS2330L on Mac Mini late 2009 (MacOS El Capitan 10.11.6). The video profiles for the cameras are set as below in the web interface.

### Video profile 1
* H.264
* Frame size/view window area 1280x720
* Max frame rate 25
* Video quality fixed/excellent

### Video profile 2
* JPEG
* Frame size/view window area 1280x720
* Max frame rate 25
* Video quality fixed/good

## config.json

```json
{
	"name": "D-Link Camera",
	"videoConfig": {
		"source": "-re -i http://user:password@192.168.0.1/video2.mjpg",
		"stillImageSource": "-i http://user:password@192.168.0.1/image/jpeg.cgi?profileid=1",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 30
	}
}
```
