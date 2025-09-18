---
title: LaView LV-PTK66802
comment: rebranded Hikvision
author: afewremarks
date: 2020-08-16
---
## Homebridge Config

```json
{
	"name": "Camera1",
	"manufacturer": "LaView",
	"model": "LV-PTK66802",
	"serialNumber": "123456789",
	"firmwareRevision": "V5.4.0 build 160811",
	"motion": true,
	"videoConfig": {
		"source": "-rtsp_transport tcp -re -i rtsp://user:password@1.1.1.1/Streaming/Channels/2",
		"stillImageSource": "-i https://user:password@1.1.1.1/streaming/channels/1/picture",
		"maxStreams": 2,
		"maxWidth": 640,
		"maxHeight": 480,
		"maxFPS": 20,
		"vcodec": "copy"
	}
}
```

## Additional Information

Note 1: I am using the substream "Channels/2" vs main stream which is "Channels/1" since I have my main stream outputting h265. This is also why the frame size is low

Note 2: if you end up using the smtp-motion you have to give your camera a name without a space. The config on the camera wont support + in the to address.
