---
title: Amcrest IP2M-842E
comment: POE bullet camera
author: Brian Saycocie
date: 2020-12-04
---
**Homebridge Config**

```json
{
  "name": "Outdoor Camera",
  "manufacturer": "Amcrest",
  "model": "IP2M-842E",
  "serialNumber": "XXXXXXXXXXXXXX",
  "firmwareRevision": "2.520.0000.0.R",
  "videoConfig": {
    "source": "-rtsp_transport tcp -re -i rtsp://username:password@ipaddress:554/cam/realmonitor?channel=1&subtype=0",
    "stillImageSource": "-i http://username:password@ipaddress/cgi-bin/snapshot.cgi?chn=1",
    "maxStreams": 2,
    "maxWidth": 1920,
    "maxHeight": 1080,
    "maxFPS": 30,
    "maxBitrate": 2048,
    "vcodec": "libx264 -preset ultrafast",
    "audio": false
  }
}
```

**Additional Information**

- Based on the [Amcrest IP4M-1026](https://sunoo.github.io/homebridge-camera-ffmpeg/configs/Amcrest-IP4M-1026.html) configuration, slightly modified for this specific camera.

- The streaming appears to be working on iOS 14.1 and tvOS 14.3.

- Works on a headless Ubuntu server with those specs, but may want to dial the values down to make it work on a Raspberry Pi e.g.:
```json
"maxWidth": 1280,
"maxHeight": 720,
"maxFPS": 15,
"maxBitrate": 1024,
```
