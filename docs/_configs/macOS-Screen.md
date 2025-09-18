---
title: macOS Screen
author: crbyxwpzfl
date: 2021-07-16
---
**Homebridge Config**

```json
{
	"name": "test",
	"unbridge": false,
	"videoConfig": {
		"source": "-f avfoundation -i 0",
		"maxStreams": 2,
		"encoderOptions": "-preset ultrafast",
		"audio": false,
		"debug": true
	}
}
```

**Additional Information**

Tested with Homebridge on macOS Big Sur.

For some reason the stream does not work with `"encoderOptions": "-preset ultrafast -tune zerolatency"`, everything except the stream works with this default encoder options even the debug output looks the same just the stream never starts.
