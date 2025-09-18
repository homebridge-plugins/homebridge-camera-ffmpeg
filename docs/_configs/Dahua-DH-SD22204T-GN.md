---
title: Dahua DH-SD22204T-GN
author: Dmitry Nosovitsky
date: 2020-09-04
---
**Homebridge Config**

```json
{
  "cameras": [{
    "name": "Gate Camera",
    "manufacturer": "Dahua",
    "model": "DH-SD22204T-GN",
    "serialNumber": "yourcameraserialnumber",
    "firmwareRevision": "yourcamerafirmwarerevision",
    "motion": true,
    "motionTimeout": 35,
    "videoConfig": {
      "source": "-rtsp_transport tcp -re -i rtsp://yourcamerauser:yourcamerapassword@yourcameraIP:554/cam/realmonitor?channel=1&subtype=0",
      "vcodec": "copy",
      "maxFPS": 4,
      "maxStreams": 2,
      "maxWidth": 704,
      "maxHeight": 576,
      "packetsize": 1316,
      "maxBitrate": 1000,
      "audio": true,
      "mapaudio": "0:1?",
      "debug": true
    }
  }],
  "platform": "Camera-ffmpeg"
}
```

**Additional Information**

- Setting "vcodec" value as "copy" let you to use even old (2015) weak (RAM 512 MB) OrangePiOne as HomeBridge with 2-5% CPU load for 11 cameras simultaneously
- "maxFPS" could be set to 14 if your camera is in good wired network
