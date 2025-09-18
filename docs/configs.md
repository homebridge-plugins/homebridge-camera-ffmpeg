---
layout: page
title: Configurations
permalink: /configs/
---
iSpyConnect [maintains a large database](https://www.ispyconnect.com/sources.aspx) of camera manufacturers, supported methods (MJPEG, FFMPEG, RTSP), and the necessary URLs for accessing video, audio, and stills. If you don’t know that information, iSpyConnect is a great place to start.

If you want to share a configuration you have tested, submit a [Tested Configuration Issue](https://github.com/Sunoo/homebridge-camera-ffmpeg/issues/new?assignees=&labels=tested+config&template=tested_config.md) and it will be added to this list shortly.

Keep in mind that many configs on this site were written for older versions of the plugin, and may require tweaks for the current version. Also, while many of these configs use the `-re` setting in the source, the FFmpeg developers recommend against using that for live sources, so I'd suggest first trying without that set. If you have any updates for any of these configs, please open an issue on the GitHub page.

Users have submitted {{ site.configs | size }} configurations:

{% assign collection = site.configs | sort_natural:"title" %}

{% for config in collection %}
+ [{{ config.title }}]({{ site.baseurl }}{{ config.url }}){% if config.comment %}
*{{ config.comment }}*{% endif %}{% endfor %}
