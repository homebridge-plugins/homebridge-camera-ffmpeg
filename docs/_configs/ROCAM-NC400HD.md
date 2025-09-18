---
title: ROCAM-NC400HD
comment: with Raspberry Pi Model B 512Mb RAM - jessie
author: BonRm
date: 2017-03-31
---
## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Camera Rocam-NC400HD",
		"videoConfig": {
			"source": "-re -i http://IPADDRESS:PORT/videostream.cgi?loginuse=ADMIN&loginpas=PASSWORD",
			"stillImageSource": "-i http://IPADDRESS:PORT/snapshot.cgi?user=ADMIN&pwd=PASSWORD",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 30
		}
	}]
}
```

### Notes: Replace IPADDRESS:PORT, ADMIN, PASSWORD with your data
