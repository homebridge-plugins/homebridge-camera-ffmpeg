---
title: MQTT-based Automation
order: 2
---
### Setup

Set `mqtt` in your config to be the host or IP of your MQTT broker. The MQTT client will not start without this set. You can also set `portmqtt` if your broker listens on a port other than the default 1883. Set the topics and messages used by your camera in the `mqtt` of your camera config.

### Usage

To trigger the motion sensor publish to topic configured in `motionTopic` using the message defined in `motionMessage`.

If you publish the message in `motionResetMessage` to `motionResetTopic` it will reset the motion sensor. If you plan to use this function, it is recommended to set `motionTimeout` under the camera to `0` to disable the automatic reset of the motion sensor.

Doorbell activation is also available by publishing to topic in `doorbellTopic` with the message from `doorbellMessage`.

In all cases, if you have no message configured, the name of your camera will be expected as the message instead.

### Config Example

```json
{
  "platform": "Camera-ffmpeg",
  "mqtt": "127.0.0.1",
  "cameras": [
    {
      "name": "Camera name",
      "motion": true,
      "motionTimeout": 1,
      "videoConfig": {
        "source": "-i http://10.0.0.1",
        "stillImageSource": "-i http://10.0.0.1",
        "maxStreams": 5,
        "maxWidth": 1280,
        "maxHeight": 720,
        "maxFPS": 15,
        "maxBitrate": 1000
      },
      "mqtt": {
        "motionTopic": "home/camera",
        "motionMessage": "ON",
        "motionResetTopic": "home/camera",
        "motionResetMessage": "OFF",
        "doorbellTopic": "home/doobell",
        "doorbellMessage": "ON"
      }
    }
  ]
}
```

### Legacy Compatibility

The way MQTT support works was changed significantly in version 3.10. If you need compatibility with the way prior versions worked, you can follow the below example, substituting `homebridge` in the `mqtt` section for whatever `topic` you had configured.

### Legacy Compatibility Config Example

```json
{
  "platform": "Camera-ffmpeg",
  "mqtt": "127.0.0.1",
  "cameras": [
    {
      "name": "Camera name",
      "motion": true,
      "videoConfig": {
        "source": "-i http://10.0.0.1",
      }
      "mqtt": {
        "motionTopic": "homebridge/motion",
        "motionResetTopic": "homebridge/motion/reset",
        "doorbellTopic": "homebridge/doobell"
      }
    }
  ]
}
```
