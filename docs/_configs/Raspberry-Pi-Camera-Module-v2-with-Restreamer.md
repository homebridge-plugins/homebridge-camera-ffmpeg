---
title: Raspberry Pi Camera Module v2 with Restreamer
author: Fabian Leutgeb
date: 2020-12-07
---
- [Raspberry Pi Camera Module v2](https://www.raspberrypi.org/products/camera-module-v2/)
- [Raspberry Pi 4 Model B 2GB RAM](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/)
- [Raspberry Pi OS Lite](https://www.raspberrypi.org/software/operating-systems/) (Debian Buster)

**Homebridge Config**

Change `<port>` to the value set for Restreamer in the `docker-compose` config below

```json
{
	"name": "Camera",
	"videoConfig": {
		"source": "-re -i http://10.0.0.4:<port>/hls/live.stream.m3u8",
		"stillImageSource": "-i http://10.0.0.4:<port>/images/live.jpg",
		"maxStreams": 2,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 25,
		"maxBitrate": 300,
		"packetSize": 1316,
		"vcodec": "copy",
		"videoFilter": "none",
		"audio": false
	}
}
```

**Additional Information**

- Docker is required for this setup (see [this guide](https://dev.to/rohansawant/installing-docker-and-docker-compose-on-the-raspberry-pi-in-5-simple-steps-3mgl))

- I was using [Restreamer](https://datarhei.github.io/restreamer/docs/guides-raspicam.html) to provide a `rtmp` stream from the camera ([w/o re-encoding it](https://datarhei.github.io/restreamer/docs/guides-encoding.html)) with almost no setup or configuration needed

- Setting `vcodec` `copy` also in Homebridge was keeping CPU usage very low (at around 10%), as it was not re-encoding the already h264 encoded stream

- The video via Homebridge was choppy without the `-re` flag in `source`

**Restreamer `docker-compose` Config**

Set `<port>` to a port available on the host, e.g., `8080`, and replace `<username>` and `<password>`

```yml
services:
  restreamer:
    container_name: restreamer
    image: datarhei/restreamer-armv7l:latest
    privileged: true
    restart: always
    environment:
      - RS_USERNAME=<username>
      - RS_PASSWORD=<password>
      - RS_MODE=RASPICAM
      - RS_INPUTSTREAM=rtmp://127.0.0.1/live/raspicam.stream
      - RS_TIMEZONE=Europe/Vienna
      - RS_SNAPSHOT_INTERVAL=1m
    ports:
      - <port>:8080
    volumes:
      - /mnt/restreamer/db:/restreamer/db:rw
      - /opt/vc:/opt/vc
```
