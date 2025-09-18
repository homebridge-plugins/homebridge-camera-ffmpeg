---
title: Switch-based Automation
order: 1
---
With iOS 13 the ability to create Photo Notifications by placing a contact, or motion sensor in the same room as a camera went away.  And as the feature scored very high on the WAF scale, I created the workaround based on the new requirement to have a motion sensor as part of the camera accessory.

With the workaround, a dummy switch and motion sensor are created as part of the camera.  And by turning on the switch, it will trigger the dummy motion sensor, which will then send a Photo Notification to your iPhone/iPad.  To turn on the switch, you can create an automation from your real motion sensor, and have it turn on the dummy switch attached to the camera.

# Setup Instructions

To enable the work around, add the options `"motion": true` and `"switches": true` to your homebridge-camera-ffmpeg configuration, then in the home app, enable notifications in the setup screen for your camera, then create the automation.

## 1. Sample config.json with the motion option

```json
{
  "bridge": {
    "name": "Test Homebridge",
    "username": "AA:BB:CC:DD:DD:FF",
    "port": 51826,
    "pin": "031-45-154"
  },

  "description": "HomeBridge Test Instance",

  "plugins": [
    "homebridge-camera-ffmpeg"
  ],

  "platforms": [{
    "platform": "Camera-ffmpeg",
    "cameras": [{
      "name": "Test",
      "motion": true,
      "switches": true,
      "videoConfig": {
       "source": "-f mjpeg -i http://test:8080/video",
        "stillImageSource": "-i http://test:8080/shot.jpg",
        "maxStreams": 2,
        "maxWidth": 1920,
        "maxHeight": 1080,
        "maxFPS": 15,
        "debug": true
      }
    }, {
      "name": "TestDW",
      "motion": true,
      "switches": true,
      "videoConfig": {
       "source": "-f mjpeg -i http://TestDW:8080/video",
        "stillImageSource": "-i http://TestDW:8080/shot.jpg",
        "maxStreams": 2,
        "maxWidth": 1920,
        "maxHeight": 1080,
        "maxFPS": 15,
        "debug": true
      }
    }]
  }],

  "accessories": []
}
```

## 2. Create the automation

In the home app on your phone, create an automation triggered when your Motion Sensor detects motion that turns on the switch created by your camera.

![]({{ site.baseurl }}/assets/iOS-13-Switch-Automation-Example.png)

# Known Issues

## Occasionally notifications do not include a photo

In issue #363 it was identified that if the plugin/camera is slow to respond to the snapshot request, HomeKit will send the notification without the photo.  Have not determined what the timeout is for the photo yet.

Also be sure that you only have notifications enabled in the camera's settings and not on the external motion sensor that triggers your automation. Otherwise you will receive a notification from the external motion sensor first and this does not have a photo attached but it obscures the subsequent notification from the camera that does have a photo.

# FYI

One side effect of the change is that each iOS device now sends an individual snapshot request when motion is detected, and this caused a mini DDOS attack on my camera.  During my last round of testing I counted 4 snapshot requests at once to my camera, where previously it was a single request.

Just a heads up, as you may now encounter resource constraints on your homebridge instance or camera, if you have a lot of iOS devices.
