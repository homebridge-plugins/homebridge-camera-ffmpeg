# Swann DVR8-4575 with PRO-1080MSB-BNC Cameras

**Manufacturer/Model:** Swann / DVR8-4575 / PRO-1080MSB-BNC

## System Information

- **Head Unit:** DVR8-4575, Ethernet connected, capable of 8x coax-based cameras
- **Cameras:** 6x BNC (coax) cameras (PRO-1080MSB-BNC)
- **Platform:** Raspberry Pi 5 8GB
- **Homebridge:** v1.11.0
- **Homebridge UI:** v5.4.1
- **Node.js:** v22.18.0
- **ffmpeg:** v5.1.6

## Configuration

```json
{
    "name": "PluginUpdate",
    "videoProcessor": "/usr/bin/ffmpeg",
    "cameras": [
        {
            "name": "Swan_01",
            "videoConfig": {
                "source": "-rtsp_transport tcp -i rtsp://192.168.20.56:554/ch01/0",
                "stillImageSource": "-i rtsp://192.168.20.56:554/ch01/1",
                "maxWidth": 1920,
                "maxHeight": 1080,
                "maxFPS": 25,
                "forceMax": true,
                "vcodec": "copy",
                "audio": false,
                "recording": false,
                "prebuffer": false
            }
        },
        {
            "name": "Swan_02",
            "videoConfig": {
                "source": "-rtsp_transport tcp -i rtsp://192.168.20.56:554/ch02/0",
                "stillImageSource": "-i rtsp://192.168.20.56:554/ch02/1",
                "maxWidth": 1920,
                "maxHeight": 1080,
                "maxFPS": 25,
                "forceMax": true,
                "vcodec": "copy",
                "recording": false,
                "prebuffer": false
            }
        },
        {
            "name": "Swan_03",
            "videoConfig": {
                "source": "-rtsp_transport tcp -i rtsp://192.168.20.56:554/ch03/0",
                "stillImageSource": "-i rtsp://192.168.20.56:554/ch03/1",
                "maxWidth": 1920,
                "maxHeight": 1080,
                "maxFPS": 25,
                "forceMax": true,
                "vcodec": "copy",
                "recording": false,
                "prebuffer": false
            }
        },
        {
            "name": "Swan_04",
            "videoConfig": {
                "source": "-rtsp_transport tcp -i rtsp://192.168.20.56:554/ch04/0",
                "stillImageSource": "-i rtsp://192.168.20.56:554/ch04/1",
                "maxWidth": 1920,
                "maxHeight": 1080,
                "maxFPS": 25,
                "forceMax": true,
                "vcodec": "copy",
                "recording": false,
                "prebuffer": false
            }
        },
        {
            "name": "Swan_05",
            "videoConfig": {
                "source": "-rtsp_transport tcp -i rtsp://192.168.20.56:554/ch05/0",
                "stillImageSource": "-i rtsp://192.168.20.56:554/ch05/1",
                "maxWidth": 1920,
                "maxHeight": 1080,
                "maxFPS": 25,
                "forceMax": true,
                "vcodec": "copy",
                "recording": false,
                "prebuffer": false
            }
        },
        {
            "name": "Swan_06",
            "videoConfig": {
                "source": "-rtsp_transport tcp -i rtsp://192.168.20.56:554/ch06/0",
                "stillImageSource": "-i rtsp://192.168.20.56:554/ch06/1",
                "maxWidth": 1920,
                "maxHeight": 1080,
                "maxFPS": 25,
                "forceMax": true,
                "vcodec": "copy",
                "recording": false,
                "prebuffer": false
            }
        }
    ],
    "_bridge": {
        "username": "0E:A0:34:02:BB:CE",
        "port": 43826
    },
    "platform": "Camera-ffmpeg"
}
```

## Configuration Notes

### Key Settings

- **RTSP Transport:** Uses TCP transport (`-rtsp_transport tcp`) for reliable streaming
- **Video Codec:** Uses `"vcodec": "copy"` to avoid re-encoding, reducing CPU load
- **Resolution:** Set to maximum 1920x1080 with 25 FPS
- **Force Max:** `"forceMax": true` ensures consistent quality
- **Audio:** Disabled (`"audio": false`) as not needed for security cameras
- **Recording/Prebuffer:** Both disabled to reduce system resources

### RTSP URLs

- **Live Stream:** `rtsp://[IP]:554/ch[XX]/0` (where XX is the channel number 01-08)
- **Still Image:** `rtsp://[IP]:554/ch[XX]/1`

### Setup Requirements

1. Replace `192.168.20.56` with your DVR's IP address
2. Ensure the DVR has RTSP enabled
3. Configure channels 01-06 (or adjust as needed for your setup)
4. Update camera names to match your preferences

### Performance Notes

This configuration is optimized for:
- Low CPU usage (using `vcodec: "copy"`)
- Stable streaming (TCP transport)
- Raspberry Pi hardware
- Multiple camera streams (6 cameras)

## Source

Configuration shared by [mag911](https://github.com/mag911) in [issue #1504](https://github.com/homebridge-plugins/homebridge-camera-ffmpeg/issues/1504).