---
title: HTTP-based Automation
order: 3
---
### Setup

Set `porthttp` in your config to be whatever port you want the HTTP server to listen on. The server will not start without this set.

### Usage

To trigger the motion sensor make an HTTP request to `http://hostname:port/motion?Camera%20Name` where the 'Camera%20Name' is the URL encoded name of the camera (so, for example, a space becomes %20).

If you make an HTTP call to `http://hostname:port/motion/reset?Camera%20Name` it will reset the motion sensor. If you plan to use this function, it is recommended to set `motionTimeout` under the camera to `0` to disable the automatic reset of the motion sensor.

Doorbell activation is also available by making a call to `http://hostname:port/doorbell?Camera%20Name`.

### Config Example

```json
{
  "platform": "Camera-ffmpeg",
  "porthttp": "8080",
  "topic": "homebridge",
  "cameras": [
    {
      "name": "Camera Name",
      "motion": true,
      "motionTimeout": 1,
      "videoConfig": {
        "source": "-re -i http://10.0.0.1",
        "stillImageSource": "-i http://10.0.0.1",
        "maxStreams": 5,
        "maxWidth": 1280,
        "maxHeight": 720,
        "maxFPS": 15,
        "maxBitrate": 1000
      }
    }
  ]
}
```