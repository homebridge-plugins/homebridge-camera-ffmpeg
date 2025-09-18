---
title: D-Link DCS-942L
author: WaldperlachFabi
date: 2021-05-17
---
**Homebridge Config**

```json
{
	"name": "D-link",
	"motionDoorbell": true,
	"doorbell": true,
	"switches": true,
	"videoConfig": {
		"stillImageSource": "-i https://xxx.xxx.xxx.xx/image/jpeg.cgi",
		"source": "-i rtsp://xxx.xxx.xxx.xx/play1.sdp",
		"maxWidth": 640,
		"audio": true,
		"maxHeight": 480
	},
	"motion": true
}
```

xxx.xxx.xxx.xx is the IP address from your camera.

**Additional Information**

Please set up in the camera settings that you dont need a password for rtsp stream and the photo.

Sorry that the photos are in German. But I think you can see what you have to adjust.

![IMG_2303](https://user-images.githubusercontent.com/80318133/118520280-3c255d80-b73a-11eb-992c-6726d5436fa1.jpeg)

![IMG_2304](https://user-images.githubusercontent.com/80318133/118520313-42b3d500-b73a-11eb-957b-07f7fa8943b1.jpeg)
