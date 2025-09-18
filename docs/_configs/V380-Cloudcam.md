---
title: V380 Cloudcam
author: LeJeko
date: 2019-04-04
---
**Need to patch the firmware to activate RTSP on port 554.**

Solution found [here](https://community.netcamstudio.com/t/fentac-v380-connection/1334/12)

I found the solution after talking with the support team of these cameras. It is necessary to upgrade the firmware of the camera to open the onvif ports.
Download files [here](https://drive.google.com/file/d/0B8j89vcA6EWGdlgxcWVuZTlJZ0I2U292bE5QRU1xR0YybEl3/view)
1. Unzip the files
1. Copy the files to the root of the microSD
1. Restart the camera
1. Wait until the update finishes, listening if you have a horn or watching the LEDs
1. Check that the 554 port has been opened
1. Delete the SD update files

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "V380",
		"videoConfig": {
			"vcodec": "h264_omx",
			"source": "-re -i rtsp://admin:password@XXX.XXX.XXX.XXX/live/ch00_1",
			"maxFPS": 25,
			"maxHeight": 720,
			"maxStreams": 2,
			"maxWidth": 1280
		}
	}]
}
```

### Notes
/live/ch00_1 : 1280x720

/live/ch00_0 : 640x480
