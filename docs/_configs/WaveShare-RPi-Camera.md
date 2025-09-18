---
title: WaveShare RPi Camera
comment: and Raspberry PI 3B (Stretch)
author: milmber
date: 2020-07-19
---
3 configurations using the following video codecs as per the `vcodec` parameter:
- `copy` codec for streaming with much higher quality but with a downside that you must specify the target video resolution for your iOS/MacOS device by updating the `video_size` parameter. 
- `h264` codec for streaming with good quality but using more processor power
- `h264_omx` codec for streaming with minimal processing power but with lower quality

## copy video codec

### config.json

```json
{
	"cameras": [{
		"name": "Pi 3B Camera",
		"motion": true,
		"switches": true,
		"videoConfig": {
			"source": "-re -r 30 -video_size 1920x1080 -f video4linux2 -input_format h264 -i /dev/video0 -copyts -start_at_zero -timestamps abs",
			"stillImageSource": "-video_size 1920x1080 -f video4linux2 -i /dev/video0 -ss 1.5",
			"maxStreams": 2,
			"maxFPS": 30,
			"maxBitrate": 500000000,
			"vcodec": "copy",
			"audio": false,
			"vflip": false,
			"hflip": false,
			"debug": true
		}
	}],
	"platform": "Camera-ffmpeg"
}
```

### notes

The resolution in the example configuration above has been tested to work for iPad and MacOS. It will not work for other devices that require difference resolutions. 

Since the Raspberry Pi lacks an RTC, it should be ensured that `timesyncd` is correctly functioning, otherwise streaming will stop working as the Pi's clock drifts. E.g.

```
$ systemctl status systemd-timesyncd.service
● systemd-timesyncd.service - Network Time Synchronization
   Loaded: loaded (/lib/systemd/system/systemd-timesyncd.service; enabled; vendor preset: enabled)
  Drop-In: /lib/systemd/system/systemd-timesyncd.service.d
           └─disable-with-time-daemon.conf
   Active: active (running) since Sun 2020-07-19 09:48:38 BST; 5h 9min ago
     Docs: man:systemd-timesyncd.service(8)
 Main PID: 30120 (systemd-timesyn)
   Status: "Synchronized to time server 216.239.35.4:123 (time.google.com)."
   CGroup: /system.slice/systemd-timesyncd.service
           └─30120 /lib/systemd/systemd-timesyncd

Jul 19 09:48:38 raspberrypizerow systemd[1]: Starting Network Time Synchronization...
Jul 19 09:48:38 raspberrypizerow systemd[1]: Started Network Time Synchronization.
Jul 19 09:48:38 raspberrypizerow systemd-timesyncd[30120]: Synchronized to time server 216.239.35.4:123 (time.google.com).
```

If necessary it may be needed to update the NTP server configuration in `/etc/systemd/timesyncd.conf`

## h264 video codec

### config.json 

```json
{
    "cameras": [
        {
            "name": "Pi 3B Camera",
            "motion": true,
            "switches": true,
            "videoConfig": {
                "source": "-re -r 30 -video_size 1920x1080 -f video4linux2 -input_format h264 -i /dev/video0 -crf 18 -threads 3",
                "stillImageSource": "-video_size 1920x1080 -f video4linux2 -i /dev/video0 -ss 1.5",
                "maxStreams": 2,
                "maxFPS": 30,
                "vcodec": "h264",
                "audio": false,
                "vflip": false,
                "hflip": false,
                "debug": true
            }
        }
    ],
    "platform": "Camera-ffmpeg"
}
```

### notes

The `crf` and `threads` parameters allow for setting adequate video quality and using multiple RPI cores. Works across all iOS/MacOS devices but with significant CPU overhead.

## h264_omx video codec

### config.json

```json
{
    "cameras": [
        {
            "name": "Pi 3B Camera",
            "motion": true,
            "switches": true,
            "videoConfig": {
                "source": "-re -r 30 -video_size 1920x1080 -f video4linux2 -input_format h264 -i /dev/video0",
                "stillImageSource": "-video_size 1920x1080 -f video4linux2 -i /dev/video0 -ss 1.5",
                "maxStreams": 2,
                "maxFPS": 30,
                "maxBitrate": 500000000,
                "vcodec": "h264_omx",
                "audio": false,
                "vflip": false,
                "hflip": false,
                "debug": true
            }
        }
    ],
    "platform": "Camera-ffmpeg"
}
```

### notes 

While fast, and working across all iOS/MacOS devices, the `h264_omx` video codec doesn't support many options and provides sub-standard quality compared to the other options (at least when using a RPI camera). E.g.

```
$ ffmpeg -h encoder=h264_omx
ffmpeg version 3.2.14-1~deb9u1+rpt1 Copyright (c) 2000-2019 the FFmpeg developers
  built with gcc 6.3.0 (Raspbian 6.3.0-18+rpi1+deb9u1) 20170516
  configuration: --prefix=/usr --extra-version='1~deb9u1+rpt1' --toolchain=hardened --libdir=/usr/lib/arm-linux-gnueabihf --incdir=/usr/include/arm-linux-gnueabihf --enable-gpl --disable-stripping --enable-avresample --enable-avisynth --enable-gnutls --enable-ladspa --enable-libass --enable-libbluray --enable-libbs2b --enable-libcaca --enable-libcdio --enable-libebur128 --enable-libflite --enable-libfontconfig --enable-libfreetype --enable-libfribidi --enable-libgme --enable-libgsm --enable-libmp3lame --enable-libopenjpeg --enable-libopenmpt --enable-libopus --enable-libpulse --enable-librubberband --enable-libshine --enable-libsnappy --enable-libsoxr --enable-libspeex --enable-libssh --enable-libtheora --enable-libtwolame --enable-libvorbis --enable-libvpx --enable-libwavpack --enable-libwebp --enable-libx265 --enable-libxvid --enable-libzmq --enable-libzvbi --enable-omx --enable-omx-rpi --enable-mmal --enable-openal --enable-opengl --enable-sdl2 --enable-libdc1394 --enable-libiec61883 --arch=armhf --enable-chromaprint --enable-frei0r --enable-libopencv --enable-libx264 --enable-shared
  libavutil      55. 34.101 / 55. 34.101
  libavcodec     57. 64.101 / 57. 64.101
  libavformat    57. 56.101 / 57. 56.101
  libavdevice    57.  1.100 / 57.  1.100
  libavfilter     6. 65.100 /  6. 65.100
  libavresample   3.  1.  0 /  3.  1.  0
  libswscale      4.  2.100 /  4.  2.100
  libswresample   2.  3.100 /  2.  3.100
  libpostproc    54.  1.100 / 54.  1.100
Encoder h264_omx [OpenMAX IL H.264 video encoder]:
    General capabilities: delay 
    Threading capabilities: none
    Supported pixel formats: yuv420p
h264_omx AVOptions:
  -omx_libname       <string>     ED.V.... OpenMAX library name
  -omx_libprefix     <string>     ED.V.... OpenMAX library prefix
  -zerocopy          <int>        E..V.... Try to avoid copying input frames if possible (from 0 to 1) (default 0)
```
