---
title: Wyze Cam v2 / v3 / Pan / Doorbell / Outdoor
comment: on docker-wyze-bridge
author: mrlt8
date: 2021-09-29
---
**Homebridge Config**

```json
{
	"name": "CAM_NAME",
	"manufacturer": "WyzeCam",
	"model": "WYZE_CAKP2JFUS",
	"unbridge": true,
	"videoConfig": {
		"source": "-i rtsp://<docker-wyze-bridge-ip>:8554/cam-name",
		"vcodec": "copy"
	}
}
```

**Additional Information**

docker-wyze-bridge does not support audio at this time.

Depending on your config, you may want to rotate the doorbell cam in homebridge with hardware acceleration, which can be done by specifying your `vcodec` of choice and setting `videoFilter` to `transpose=1`:

```json
"videoConfig": {
  "source": "-i rtsp://10.0.0.10:8554/front",
  "vcodec": "libx264",
  "videoFilter": "transpose=1"
}
```
