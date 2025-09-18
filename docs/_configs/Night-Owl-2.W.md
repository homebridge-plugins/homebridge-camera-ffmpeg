---
title: Night Owl 2.W
comment: (WNVR201 Series)
author: Luis Ramos
date: 2021-10-01
---
**Homebridge Config**

```json
{
	"name": "Front Door",
	"manufacturer": "NightOwl SP",
	"unbridge": true,
	"videoConfig": {
		"source": "-i http://[IP]:80/cgi-bin/sp.cgi?chn=[CHANNEL]&u=[USER]&p=[PASSWORD]",
		"stillImageSource": "-i http://[USER]:[PASSWORD]@[IP]/cgi-bin/snapshot.cgi?chn=[CHANNEL]&u=[USER]&p=[PASSWORD]",
		"maxStreams": 2,
		"maxWidth": 1920,
		"maxHeight": 1080,
		"maxFPS": 0,
		"audio": false
	}
}
```

**Additional Information**

You can try setting the video codec to `h264_omx` but I've found the default `libx264` to be more reliable. Audio is not supported.
