---
title: Xiaomi Xiaofang 1S
comment: on Raspberry Pi3b (maybe also for Pi2 etc)
author: mrdc
date: 2019-11-23
---
Hello,

I've had the issue with `vcodec copy` option for a long time - Live stream was always failing after 1 second.
Not it's fixed (config for Xiaomi Xiaofang 1S):

```json
{
	"name": "Camera",
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://your_ip_address",
		"maxFPS": 30,
		"maxWidth": 1280,
		"maxHeight": 720,
		"videoFilter": "none",
		"maxBitrate": 1024,
		"packetSize": 188,
		"maxStreams": 2,
		"vcodec": "copy",
		"audio": false
	}
}
```

Tested on ffmpeg version 4.1.4 (built with gcc 8.3.0 (Alpine 8.3.0)

```
configuration: --prefix=/usr --enable-avresample --enable-avfilter --enable-gnutls --enable-gpl --enable-libass --enable-libmp3lame --enable-libvorbis --enable-libvpx --enable-libxvid --enable-libx264 --enable-libx265 --enable-libtheora --enable-libv4l2 --enable-postproc --enable-pic --enable-pthreads --enable-shared --enable-libxcb --disable-stripping --disable-static --disable-librtmp --enable-vaapi --enable-vdpau --enable-libopus --disable-asm --disable-debug libavutil 56. 22.100 / 56. 22.100 libavcodec 58. 35.100 / 58. 35.100 libavformat 58. 20.100 / 58. 20.100 libavdevice 58. 5.100 / 58. 5.100 libavfilter 7. 40.101 / 7. 40.101 libavresample 4. 0. 0 / 4. 0. 0 libswscale 5. 3.100 / 5. 3.100 libswresample 3. 3.100 / 3. 3.100 libpostproc 55. 3.100 / 55. 3.100
```
