---
title: Reolink camera
comment: with better picture (rtmp) and audio (Ffmpeg tutorial)
author: LSD MadMac
date: 2020-03-01
---
Hello,

here is a step by step tutorial how to make it work.

The Reolink cameras have also 3 hidden streams that you get via **rtmp** protocol:
`rtmp://your.ip/bcs/channel0_ext.bcs?channel=0&stream=2&user=admin&password=XXX`

You have stream 1-3:

| ID | Name     |
| ---|----------|
| 1  | fluent   |
| 2  | balanced |
| 3  | clean    | 

**balanced** is the one we want for cleaner image.


To make audio work we need to compile **FFMPEG** with some extras eg. **libfdk-aac-dev**...
so here the step by step ... took it from old source and made it work for actual FFMPEG & Raspberry


First you need to add following to your source list:

shh into your Pi

```console
$ cd /home
```

Now we’re going to edit a file which contains the sources of debian repositories. We’ll do this with nano – a text editor.

```console
$ sudo nano /etc/apt/sources.list
```

Then use the cursor keys to get to line 2 and add…

```
deb http://www.deb-multimedia.org/ wheezy main non-free
deb http://www.deb-multimedia.org/ jessie main
```

Then
`CTRL` + `x` to exit,
`y` to confirm you want to save and
`ENTER` to confirm the filename (don’t change it)

```console
$ sudo apt-get update
```

It will update some package lists and give two errors.
1. `W: GPG error`
2. `W: Duplicate sources`

We’ll deal with those next…

```console
$ sudo apt-get install deb-multimedia-keyring
```

`y` confirm install without verification

```console
$ sudo apt-get update
```

Now we need to install all the development libraries required to build **FFMPEG**. From `sudo` to `libvorbis-dev` is is all one line.

```console
$ sudo apt-get install libfdk-aac-dev libmp3lame-dev libx264-dev libxvidcore-dev libgsm1-dev libtheora-dev libvorbis-dev
```

Now let’s get the **FFMPEG** files themselves.

```console
$ sudo git clone git://source.ffmpeg.org/ffmpeg.git
```

This is quite a large download and will **take a little while** (10-20 mins). Once complete…

```console
$ cd ffmpeg
```

Note that the following command from `sudo` to `--enable-nonfree` is all one continuous command.

```console
$ sudo ./configure --enable-libmp3lame --enable-libtheora --enable-libx264 --enable-libgsm --enable-postproc --enable-libxvid --enable-libfdk-aac --enable-pthreads --enable-libvorbis --enable-gpl --enable-nonfree
```

After a minute or so, you will get a warning about `pkg-config not found`. Ignore it. It’ll still work. Now to compile. :)

**WARNING!** Once you press `ENTER` for the `sudo make` command it will tie up your Pi4 for **about 1.5 hours** until the compile is finished. (If you are accessing your Pi via ssh, you might want to run it via screen, so you can detach and reattach without killing the process.)

```console
$ sudo make
```

This will show you what it is doing as it goes. There will be lots of scary messages you don’t understand. Best go and do something else. And best run the `sudo make` directly on the Pi if you can. If you do it by ssh you’ll have to leave your other computer on and connected until it finishes.

Once compiled, the install is a fair bit faster.

```console
$ sudo make install
```

```console
$ sudo ldconfig
```

```console
$ sudo chown -R pi /home/ffmpeg
```

------------------------------
now in homebridge conf.
add  "videoProcessor": "/home/ffmpeg/ffmpeg",
to the setup like shown below...
audio works now with all cameras that support it...
testet with Logitech USB Cam and Reolink

```json
{
	"name": "Camera ffmpeg",
	"videoProcessor": "/home/ffmpeg/ffmpeg",
	"cameras": [{
		"name": "Reolink1",
		"videoConfig": {
			"source": "-i rtmp://192.168.178.93/bcs/channel0_ext.bcs?channel=0&stream=2&user=admin&password=XXX -map 0 -an -dn -flags -global_header",
			"stillImageSource": "-i http://192.168.178.93/cgi-bin/api.cgi?cmd=Snap&channel=0&rs=wuuPhkmUCeI9WG7C&user=admin&password=XXX",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 720,
			"audio": false,
			"debug": false
		}
	}]
}
```

here another conf with audio and rtsp:

```json
{
	"name": "Reolink2",
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://admin:XXX@192.168.178.91:554/h264Preview_01_sub",
		"stillImageSource": "-i http://192.168.178.91/cgi-bin/api.cgi?cmd=Snap&channel=0&rs=wuuPhkmUCeI9WG7C&user=admin&password=XXX",
		"maxWidth": 1280,
		"maxHeight": 720,
		"vcodec": "copy",
		"audio": true,
		"debug": false
	}
}
```

so if i use here the main stream it doesn't work because of the video image size...
but with rtmp i'll can get the balanced stream that's much better...

hope this will help all other user who struggle with audio and rtmp
rtmp is really recommend for Reolink user... give it a try and you'll see...
but add  -map 0 -dn -an -flags -global_header  after your Url like you see in my conf. 
took me a day to figure it out ... 
best
M.
