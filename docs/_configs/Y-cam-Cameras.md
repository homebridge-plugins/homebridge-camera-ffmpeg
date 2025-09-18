---
title: Y-cam Cameras
author: usmcguy
date: 2017-05-18
---
Working through RTSP

This applies to the Y-Cam Cube HD1080 & Y-Cam Bullet HD1080. These are a few years old, not the current generation.  These cameras have 3 Stream types; Primary (Stream "live/0"), Secondary (Stream "live/1"), and Mobile Stream (Stream "live/2"). The Primary has higher resolution(image size) options. The mobile is designed for streaming with low-bandwidth. I have my configuration setup to use the Primary stream at 1920x1080, 18 fps, MJPEG & JPEG Snapshot Quality set to 90. I enabled authentication, but this can be disabled. For the Preview image (stillImageSource) to work, I had to add the "-f mjpeg" to the stream. Away from home, I get very good image/video quality.'

It may be worth mentioning, there are several streams available coming from the Y-Cam. This is by default and they are all on all the time. I tested them all, and had better image quality away from home using the RTSP MJPEG stream.

+ RTSP H.264 stream:	rtsp://ip_address/live/0/h264.sdp
+ RTSP MPEG4 stream:	rtsp://ip_address/live/0/mpeg4.sdp
+ RTSP MJPEG stream:	rtsp://ip_address/live/0/mjpeg.sdp
+ RTSP audio stream:	rtsp://ip_address/live/0/audio.sdp
+ HTTP M3U8 stream:	http://ip_address/live/0/h264.m3u8
+ HTTP MJPEG stream:	http://ip_address/live/0/mjpeg.jpg
+ HTTP ASF stream:	http://ip_address/live/0/mpeg4.asf
+ HTTP snapshot image:	http://ip_address/live/0/jpeg.jpg

## config.json

```json
{
	"platform": "Camera-ffmpeg",
	"cameras": [{
		"name": "Y-Cam",
		"videoConfig": {
			"source": "-rtsp_transport tcp -re -i rtsp://user:pass@ip:554/live/0/mjpeg.sdp",
			"stillImageSource": "-f mjpeg -i http://user:pass@ip:554/live/0/mjpeg.jpg",
			"maxStreams": 2,
			"maxWidth": 1920,
			"maxHeight": 1080,
			"maxFPS": 30
		}
	}]
}
```
