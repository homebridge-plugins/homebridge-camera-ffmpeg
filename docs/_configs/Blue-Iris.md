---
title: Blue Iris
author: Normen Hansen
date: 2018-03-02
---
If you have a Blue Iris server, you can add any camera with the following configuration:

```json
{
	"platform": "Camera-IP",
	"cameras": [{
		"name": "My First Camera",
		"videoConfig": {
			"source": "-re -i http://user:password@serverip/h264/camshortname/temp.ts",
			"stillImageSource": "-i http://user:password@serverip/image/camshortname?q=75",
			"maxStreams": 2,
			"maxWidth": 1280,
			"maxHeight": 1024,
			"maxFPS": 15
		}
	}]
}
```

- user/password - user with camera view permissions in Blue Iris
- serverip - The IP or hostname of your Blue Iris server
- camshortname - The short name of the camera in Blue Iris
- maxWidth/maxHeight - set to the camera native resolution

For example, you could use the following URL if for user:homebridge, password: password, server: bi.example.com, camshortname: driveway
`http://homebridge:password@bi.example.com/h264/driveway/temp.ts`
