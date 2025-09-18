---
title: Raspberry Pi with Camera Module
comment: with h264_omx or native h264
author: moritzmhmk
date: 2020-09-06
---

The following guide assumes that the [Official Homebridge Raspberry Pi Image](https://github.com/homebridge/homebridge-raspbian-image/wiki/Getting-Started) is used and the camera module is activated (e.g. via `raspi-config` *5 Interfacing Options* -> *P1 Camera*).

The resolution is limited to 720p (i.e. 1280x720) to avoid the cropping when using 1080p mode.

## Basic Config using h264_omx

recommended for Raspberry Pi 2 and newer

### config.json

```json
{
	"name": "Raspberry Pi Camera",
	"videoConfig": {
		"source": "-f video4linux2 -i /dev/video0",
		"maxStreams": 1,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 30,
		"vcodec": "h264_omx"
	}
}
```


## Advanced Config using h264_omx to support multiple streams

Requires Raspberry Pi 2 or newer!

### Step1: Install v4l2loopback

`sudo apt install v4l2loopback-dkms`

### Step2: Adjust GPU RAM split

Edit `/boot/config.txt` and change `gpu_mem=128` to `gpu_mem=256` (or use `raspi-config`).

### Step3: Start the loopback device on boot

Create file `/etc/systemd/system/camera-loopback.service`
```ini
[Unit]
Description=Set up loopback cameras

[Service]
ExecStartPre=/sbin/modprobe v4l2loopback devices=2
ExecStart=/usr/local/bin/ffmpeg -f video4linux2 -input_format yuv420p -video_size 1280x720 -i /dev/video0 -codec copy -f v4l2 /dev/video1
Restart=always
RestartSec=2

[Install]
WantedBy=default.target
```

Activate with `sudo systemctl enable camera-loopback` and start with `sudo systemctl start camera-loopback`.

### Step4: configure homebridge

Use the *Basic Config* (see above) and replace `/dev/video0` with `/dev/video1` and set `maxStreams` to `3`

*Note: more than three streams tend to crash.*


## Native h264

Only recommended for Raspberry Pi 1 (A/B/A+/B+) and Raspberry Pi Zero

Using the native h264 from the camera results in better image quality and lower cpu usage but has some drawbacks:
* resolution is fixed (e.g. 720p)
* bitrate, flip and rotation need to be adjusted separately from the command line (see below)
* streaming to multiple devices is not possible

Using [homebridge-camera-rpi](https://github.com/moritzmhmk/homebridge-camera-rpi) eliminates the first two drawbacks (*Disclaimer: I am the developer of that plugin*).

### Prerequisite

Set bitrate to 300k: `v4l2-ctl --set-ctrl video_bitrate=300000`

Optionally adjust image orientation:
* Rotate image 180 degrees: `v4l2-ctl --set-ctrl rotate=180`
* Flip image vertically: `v4l2-ctl --set-ctrl vertical_flip=1`
* Flip image horizontally: `v4l2-ctl --set-ctrl horizontal_flip=1`

### config.json

```json
{
	"name": "Raspberry Pi Zero Camera",
	"videoConfig": {
		"source": "-f video4linux2 -input_format h264 -video_size 1280x720 -framerate 30 -timestamps abs -i /dev/video0",
		"stillImageSource": "-f video4linux2 -input_format mjpeg -video_size 1280x720 -i /dev/video0",
		"maxStreams": 1,
		"maxWidth": 1280,
		"maxHeight": 720,
		"maxFPS": 30,
		"vcodec": "copy"
	}
}
```
