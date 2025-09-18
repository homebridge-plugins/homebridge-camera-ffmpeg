---
title: Motion-based Automation
order: 4
---
The August doorbell cameras are really slick, but they don’t support HomeKit at all, and their API is not made public. The August app alerts you when motion is detected or the doorbell is rung, and there are some integrations with Google and Amazon, but there’s no HomeKit integration at all. It’s a bit pathetic, really.

Doorbell-button events can be obtained (from the wired versions of August doorbell cams, at least) by using the doorbell wiring to trigger an input on something like a Sonoff SV with RavenSystem/esp-homekit-devices firmware, or a Raspberry Pi, but video motion events require a software solution. Thankfully, August saw fit to enable a basic RTSP video stream from their doorbell cameras. We can monitor that video stream, at a very low frame rate to keep network traffic to a minimum, detect motion using a lightweight video monitoring application, and send motion events to homebridge via MQTT. This method will actually work for any RTSP stream, but these instructions are specifically for an August Doorbell Cam Pro.

This is not for the faint of heart. It requires the ability to use command-line UNIX tools, navigate the filesystem, edit configuration files, and more. It is neither point-and-click nor plug-and-play. If that doesn’t scare you, then carry on.

If you haven’t already, get setup with Homebridge, preferably on a dedicated Raspberry Pi. Install the homebridge-camera-ffmpeg plugin and get your August doorbell cam configured and working there. As part of this setup, you’ll want to be sure to assign a dedicated IP address to the doorbell with your local DHCP server (probably your Internet router).

Make sure the homebridge-camera-ffmpeg configuration for the doorbell cam looks something like the following, inserting your doorbell cam's actual serial number, IP address, etc. in their respective spots (manufacturer/model/serialNumber are all optional):

```json
{
	"name": "DoorbellCam",
	"manufacturer": "August Home",
	"model": "Doorbell Cam Pro",
	"serialNumber": "ABCD12345",
	"motion": true,
	"motionTimeout": 15,
	"videoConfig": {
		"source": "-i rtsp://admin:admin@192.168.0.10/live/stream",
		"stillImageSource": "-i rtsp://admin:admin@192.168.0.10/live/stream -vframes 1 -r 1",
		"maxStreams": 2,
		"maxWidth": 480,
		"maxHeight": 640,
		"maxFPS": 10,
		"audio": true,
		"debug": false
	}
}
```

You’ll also need an MQTT broker & client:

`# sudo apt-get install mosquitto mosquitto-clients`

Edit /etc/mosquitto/mosquitto.conf and set “allow_anonymous true” unless you want to force authentication, in which case you’ll have to dig up that configuration magic yourself. Add your MQTT config to homebridge-camera-ffmpeg per [instructions](https://sunoo.github.io/homebridge-camera-ffmpeg/automation/mqtt.html).

The lightweight video stream monitoring app is called “Motion”:

`# sudo apt-get install motion`

Edit /etc/motion/motion.conf. Find these parameters and set them accordingly, inserting your Doorbell Cam’s IP in the netcam_url string (everything else should be fine at defaults):

```
width 480
height 640
netcam_url rtsp://192.168.0.10/live/stream
netcam_userpass admin:admin
netcam_keepalive on
text_right '%Y-%m-%d %T'
text_double on
stream_quality 90
stream_motion on
stream_maxrate 10
stream_localhost off
on_motion_detected /etc/motion/motion_detected.sh
```

This is a very basic no-frills configuration that will monitor your doorbell cam video at 2 fps and run the “motion_detected.sh” shell script when the motion daemon detects motion. For more information on Motion and its configuration, visit [their site](https://motion-project.github.io). Once the motion daemon is running, you can "see what it's seeing" by opening a web browser to http://x.x.x.x:8081 where x.x.x.x is the RPi's IP. Motion runs that MJPEG stream at 1 fps unless motion is detected, at which point it will run at 10 fps.

To enable motion as a system service (taken from [here](https://raspberrypi.stackexchange.com/questions/41342/how-to-start-motion-in-daemon-mode-on-rpi-running-raspbian-jessie)):

Edit /etc/default/motion and set “start_motion_daemon=yes”

Then,

`# sudo systemctl enable motion`

Now we need set up the script that Motion will use to trigger camera motion events from the command line. There are multiple ways to do this; the method I chose was taken from [here](https://www.ev3dev.org/docs/tutorials/sending-and-receiving-messages-with-mqtt/) and requires a Python module, paho-mqtt:

`# sudo pip3 install paho-mqtt`

Edit /etc/motion/motion_detected.sh and set its contents to the script below, with the following changes:

1. Set “your-mqtt-topic” to the MQTT Topic value in your homebridge-camera-ffmpeg configuration.
2. Set “DoorbellCam” to the “name” value of your doorbell cam in the homebridge-camera-ffmpeg configuration.

```python
#!/usr/bin/env python3
import paho.mqtt.client as mqtt
# This is the Publisher
client = mqtt.Client()
client.connect("localhost",1883,60)
client.publish("your-mqtt-topic/motion", "DoorbellCam");
client.disconnect();
```

Set permissions on the file:

`# sudo chmod 755 /etc/motion/motion_detected.sh`

You can execute the file directly and make sure it triggers a motion event in HomeKit:

`# sudo /etc/motion/motion_detected.sh`

Reboot your RPi, and you should start automatically receiving doorbell camera motion events in HomeKit.

If you want to reduce the streaming load on the Doorbell Cam, which may improve stability, you can set homebridge-camera-ffmpeg to use Motion's MJPEG output as the "source" and/or "stillImageSource". The text_* and stream_* settings in the Motion setup above are tailored for this use. Note that the MJPEG stream does not include audio, so if you use it for "source" you must set `"audio": false` or it won't work:

```json
{
	"name": "DoorbellCam",
	"manufacturer": "August Home",
	"model": "Doorbell Cam Pro",
	"serialNumber": "ABCD12345",
	"motion": true,
	"motionTimeout": 15,
	"videoConfig": {
		"source": "-i http://127.0.0.1:8081",
		"stillImageSource": "-i http://127.0.0.1:8081",
		"maxStreams": 2,
		"maxWidth": 480,
		"maxHeight": 640,
		"maxFPS": 10,
		"audio": false,
		"debug": false
	}
}
```
