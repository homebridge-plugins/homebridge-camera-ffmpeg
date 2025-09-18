---
title: Techage 2MP PoE NVR
author: ashtonaut
date: 2020-10-24
---
Cheap and very reliable across multiple installs with Homebridge running on Raspberry Pi 3B and 4.

Purchased from official Techage store on AliExpress.

[Link](https://www.aliexpress.com/item/32989530341.html)

I have only tested the 2MP H264 (older) and H265 (newer) PoE cameras (grey cylindrical body). I haven’t tested wifi cameras or the 5MP cameras. One way audio works.

**Homebridge Config**

```json
{
	"name": "Camera Name",
	"motion": true,
	"switches": true,
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://<cameraip>:554/user=admin&password=&channel=1&stream=0.sdp",
		"stillImageSource": "-i http://<cameraip>/webcapture.jpg?command=snap&channel=0",
		"audio": true
	}
}
```

**Additional Information**

- These cameras can upload snapshots on motion detect directly to a FTP server. I’ve used vsftp as the FTP server on the Pi.

- To set up, log into the cameras directly using their IP address (you need to use an old version of Internet Explorer, user “admin”, no password) and set up the FTP snapshot location. Then enable FTP upload on motion trigger for each camera.

- Use a plugin like homebridge-filesensor to watch the folder and trigger motion when a new snapshot is uploaded.
