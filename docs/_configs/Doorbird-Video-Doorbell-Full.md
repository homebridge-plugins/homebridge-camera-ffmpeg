---
title: Doorbird Video Doorbell
comment: Full
author: hjdhjd
date: 2017-04-09
---
This is a more complete set of settings for the Doorbird Video Doorbell based on the latest API and specs. The Doorbird video camera is 720p, capable of up to 15fps. Doorbird supports at most one live connection at a time currently. These settings use RTSP for speed / efficiency, but you can switch to HTTP if you prefer, though I wouldn't expect most people to want / need to. RTSP tends to be the standard for IP cameras. I would recommend looking at the [homebridge-doorbird plugin](https://github.com/brownad/homebridge-doorbird) as well to enable HomeKit doorbell integration on your Doorbird.

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Doorbird Camera",
		"videoConfig": {
			"source": "-re -i rtsp://<username>:<password>@<doorbird_ip>:554/mpeg/media.amp",
			"stillImageSource": "-i http://<username>:<password>@<doorbird_ip>/bha-api/image.cgi",
			"maxStreams": 1,
			"maxWidth": 1280,
			"maxHeight": 720,
			"maxFPS": 15
		}
	}]
}
```
