---
title: Vivint Doorbell Camera Pro
author: Error404UNF
date: 2020-10-14
---
**Homebridge Config**

```json
{
	"name": "Doorbell",
	"manufacturer": "VIVINT",
	"model": "DBC300",
	"motion": true,
	"doorbell": true,
	"motionTimeout": 1,
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://user:XYXYXYXYXYXYXYXYXYXYXYX@10.10.10.10:0000/Video-00",
		"vcodec": "copy",
		"audio": true
	}
}
```

**Additional Information**

2 way audio not included due to WIP state. Ensure you have "showCameraConfig": true in the Vivint platform in config.json, copy the Config from the log in the Homebridge Log, paste into the "source" in the Config. Optional videoConfig Parameters can go anywhere after "source".
