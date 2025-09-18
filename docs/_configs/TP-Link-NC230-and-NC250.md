---
title: TP-Link NC230 and NC250
author: Daniel Berlin
date: 2021-02-25
---
**Homebridge Config**

```json
{
	"name": "Camera",
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://USERNAME:PASSWORD@CAMERA-IP-OR-HOST/h264_hd.sdp",
		"stillImageSource": "-i http://USERNAME:PASSWORD@CAMERA-IP-OR-HOST:8080/stream/snapshot.jpg",
		"maxWidth": 0,
		"maxHeight": 0,
		"maxFPS": 0,
		"vcodec": "h264_omx",
		"audio": true
	}
}
```

**Additional Information**

I achieved the best best quality and least interruptions with the following settings:

- set the FPS in the camerca config UI to 20 FPS, more FPS lead to interruptions (but YMMV!)

- set maxFPS, maxWidth and maxHeight to 0 (as shown above), so that the video is not resized and the FPS is not changed; otherwise the (already mediocre) quality becomes absolutely ugly!

- h264_omx gives the best performance on Raspberry Pis with small quality impact. On non-Pis, you'll probably want to choose another codec

Audio quality is very bad and I did not find a way to improve it... but it's better than nothing.
