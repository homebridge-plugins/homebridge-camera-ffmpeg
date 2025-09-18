---
title: Toadi Automatic Mower
author: Gus Muche
date: 2021-10-17
---
**Homebridge Config**

```json
{
	"name": "Toadi2",
	"motion": false,
	"switches": false,
	"unbridge": true,
	"videoConfig": {
		"source": "-re -loop 1 -i http://IPfromControlPanel:8080/image/front/img.jpg?timestamp=21439115",
		"stillImageSource": "-i http://IPfromControlPanel::8080/image/front/img.jpg?timestamp=21439115",
		"maxStreams": 1,
		"maxWidth": 640,
		"maxHeight": 480,
		"maxFPS": 1,
		"debug": false
	}
}
```

**Additional Information**

Maybe the frame rate can be shorter. Just play with the parameters.

The link to the image can be found with a right click on the image stream from the control panel and paste in the navigation bar.
