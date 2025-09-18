---
title: TP-Link Tapo C310
author: githubwyllie
date: 2021-08-16
---
**Homebridge Config**

```json
{
	"name": "Tapo C310",
	"motion": true,
	"doorbell": true,
	"videoConfig": {
		"source": "-i rtsp://USER:PASSWORD@IP:554/stream1",
		"audio": true
	}
}
```
