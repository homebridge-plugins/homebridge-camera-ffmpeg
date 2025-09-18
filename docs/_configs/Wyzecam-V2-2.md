---
title: Wyzecam V2
comment: running their rtsp v2 firmware
author: Bluey05
date: 2021-02-28
---
**Homebridge Config**

```json
{
	"name": "WyzeCam-Garage",
	"motion": true,
	"videoConfig": {
		"source": "-i rtsp://usezrname:password@192.168.188.27/live",
		"maxStreams": 1,
		"vcodec": "copy",
		"packetSize": 188,
		"audio": true
	}
}
```

**Additional Information**

***Hardware***

I have been experimenting with implementing FFmpeg plugin on my homebridge for weeks.

I used an old mac mini, a more recent mac mini and a windows PC.

I installed Homebridge on MAC, Windows and Linux Distro's (Tried with Ubuntu, Mint Linux and Debian)

I have a very good working Homebridge running on an old Intel Mac - 2,0GHz, with 4GB RAM

***Issues***

The issues encountered were;
- very long delay before video was showing (sometimes up to 40 seconds),

- blurry snapshots on the bottom half of the image due to missed frames.

I had been using every bit of advise and suggestions, I could find on the internet, adding, adapting and removing FFmpeg parameters, but ultimately found the above JSON config, working almost perfectly.

***My gestimate on why this works***

Why (to my humble knowledge) this one works;

- Using a domain name, to avoid the use of internal addresses delays the return of video with 10 seconds (in my case) and is actually not required, if you already have a Homepod or AppleTV incorporated in your Homekit setup. It also voids the opening of as many ports as you have cameras...

- Removing the still image source will force use of the WyzeCam software to produce an image captured from the video stream which is crisp clear and shows no anomalies (Images refreshes almost every 1 to 15 seconds on "MyHome" page of Homekit)

- setting the "maxstream" to one, made a difference of almost 5 seconds for the video to start playing on my iPhone (Cannot gestimate why, but this setting does not stop me from looking at the same stream from multiple sources)

- vcopy (explains itself and all tips and tricks found on the intern explain that better than I can)

- reducing the packet size has made a huge difference for the video stream to start playing

***Finally after months of trying***

In short, I now have crisp clear snapshots, one way audio, motion detection and a video stream, will always start in less than 10 seconds when on premise and between 15 to 20 seconds, when offsite on 4G (depending on 4G signal strength).

I hope this can help some of you out there.