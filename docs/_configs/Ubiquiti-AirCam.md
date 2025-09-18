---
title: Ubiquiti AirCam
comment: (Generation 1, firmware v3.1.4.39), RPi 3
author: Matevž Gačnik
date: 2017-02-13
---
Working without Ubiquiti NVR (running software UniFi Video), available on [Ubiquiti site](https://www.ubnt.com/download/unifi-video/) or via a direct RTSP connection to camera (older firmware, via ffmpeg).

Using <https://github.com/legotheboss/homebridge-camera-ffmpeg-omx> fork for RPi 3 support.

## config.json

```json
{
	"name": "Driveway",
	"videoConfig": {
		"source": "-rtsp_transport http -re -i rtsp://domain:port/4a1baa33-31a8-52f3-5524-12345aa111a7_0",
		"maxStreams": 2,
		"maxWidth": 1270,
		"maxHeight": 720,
		"maxFPS": 15
	}
}
```

### Notes:

- The RTSP stream can come from cameras or UniFi Video server (probably from the NVR too).
- Works remotely if you have Apple TV 4/iPad setup as a homekit hub.
- Running homebridge on Raspberry Pi 3.
- Streaming startup takes ~10s, thumbnails get generated automatically.
