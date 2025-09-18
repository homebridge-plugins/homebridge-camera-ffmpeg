---
title: ZNV ZDIE-2121W-N3T-A
author: Caribsky
date: 2018-04-20
---
[Product page](http://www.znv.com/product/detail.aspx?id=100000569652783&nodecode=101002001010)

**Frame Rate:**
* Master: 1280×960@25/30fps, 1280×720@25/30fps
* Slave: 704×576@25/30fps, 640×480@25/30fps

### config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "ZNVCam",
		"uploader": false,
		"videoConfig": {
			"source": "-rtsp_transport tcp -re -I rtsp://<admin>:<password>@192.168.0.254:554/ch0_0.h264",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"packetSize": 188,
			"maxFPS": 30,
			"maxBitrate": 300,
			"debug": false
		}
	}]
}
```
