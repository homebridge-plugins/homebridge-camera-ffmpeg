---
title: ESP32-Cam Module
author: odx
date: 2019-12-22
---
## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "ESP32-Cam",
		"manufacturer": "espressif",
		"model": "ESP32-Cam",
		"serialNumber": "XXXXXXXXX",
		"videoConfig": {
			"source": "-re -f mjpeg -i http://XXX.XXX.XXX.XXX:81/stream",
			"stillImageSource": "-f mjpeg -i http://XXX.XXX.XXX.XXX/capture",
			"maxStreams": 2,
			"maxWidth": 1600,
			"maxHeight": 1200,
			"maxFPS": 25
		}
	}]
}
```

### Notes

Replace XXX.XXX.XXX.XXX, etc with your values.
This is the config for the ESP32-Cam "CameraWebServer" example provided by espressif. Setup your Arduino IDE accordingly: <https://github.com/espressif/arduino-esp32/tree/master/docs/arduino-ide>
You will just add your Wifi SSID and select camera model in the source code.
