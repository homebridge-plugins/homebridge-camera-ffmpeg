---
title: D-Link DCS-933L
author: Agneev Mukherjee
date: 2021-09-02
---
## Main config

This uses MJPEG with no audio. Results in little to no delay when starting up, however the video might get jittery after a while.

```json
{
    "name": "Front Gate Camera",
    "manufacturer": "D-Link",
    "model": "DCS-933L",
    "firmwareRevision": "1.15.01",
    "videoConfig": {
        "source": "-re -f mjpeg -i http://user:pass@IP/mjpeg.cgi",
        "stillImageSource": "-i http://user:pass@IP/image/jpeg.cgi",
        "maxStreams": 6,
        "maxWidth": 0,
        "maxHeight": 0,
        "maxFPS": 0,
        "maxBitrate": 6000,
        "forceMax": true,
        "preserveRatio": true,
        "encoderOptions": "-tune zerolatency"
    }
}
```

## H.264 config

This uses H.264 with no audio. There's approx. 5 secs delay at the start, then smooth video throughout.

From main config:

```json
{
    "videoConfig": {
        "source": "-re -i http://user:pass@IP/dgh264.raw"
    }
}
```

## H.264 audio config

There's ~10 secs delay at the start and audio is functional. Best option if you want reliable audio and video.

From main config:

```json
{
    "videoConfig": {
        "source": "-re -i http://user:pass@IP/dgh264.raw -i http://user:pass@IP/dgaudio.cgi",
        "mapaudio": "1:0",
        "audio": true
    }
}
```

## MJPEG audio config

(Not recommended)

This also results in a delay of ~10 secs. In my testing, I've found that audio would often cut out, so the H.264 audio config is the best bet.

From main config:

```json
{
    "videoConfig": {
        "source": "-re -f mjpeg -i http://user:pass@IP/mjpeg.cgi -i http://user:pass@IP/audio.cgi",
        "mapaudio": "1:0",
        "audio": true
    }
}
```

## Additional Information

Tested on Raspberry Pi 4 running Ubuntu 20.04 (64-bit).
