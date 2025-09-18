---
title: Amcrest IP8M-2496E
author: reflectivist
date: 2022-01-23
---
**Homebridge Config**

```json
{
	"name": "Carport",
	"manufacturer": "Amcrest",
	"model": "IP8M-2496EB",
	"serialNumber": "AMC04677C19C80AB21",
	"firmwareRevision": "2.622_00AC000.0.R.210319",
	"unbridge": false,
	"videoConfig": {
		"source": "-i rtsp://admin:mypassword@xxx.xxx.xxx.xxx@cam/realmonitor?channel=1&subtype=0",
		"stillImageSource": "-i http://admin:mypassword@xxx.xxx.xxx.xxx/cgi-bin/snapshot.cgi",
		"maxStreams": 2,
		"maxFPS": 15,
		"maxWidth": 3840,
		"maxHeight": 2160,
		"maxBitrate": 4096,
		"encoderOptions": "-profile high -preset ultrafast -tune zerolatency",
		"vcodec": "libx264",
		"audio": false
	}
}
```

**Additional Information**

Download the Amcrest Config tool to get all of the information and configuration parameter data specific to your Amcrest camera, such as protocol, max frame rate, max bit rate, ... including firmware revision (Camera firmware with that tool too, and firmware is easy to locate by searching for Amcrest firmware on the web).

Search web for "Amcrest API" to find the documentation that describes how to access the camera, including format of the rtsp:// URL, and the still image URL. That document indicates URL default options that could possibly be omitted (due to redundancy) from the configuration line (such as port 554 being the default, and channel=1).

The x264 --fullhelp command which you can enter in a terminal window on your homebridge server, lists libx264 codec options. Note that the IP8M-2496E shows up in the Amcrest config tool as using the H.264H protocol (H for 'high'), as opposed to H.264, which is base cnfiguration. H.264H translates to -profile high in the libx264 codec options.

On macOS Monterey the default ffmpeg command was too early a version and didn't support all the options homebridge was passing to it. Building the latest stable ffmpeg from source on github fixed that (had to build it with H.264 explicitly enabled on the configuration command).
