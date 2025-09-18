---
layout: page
title: Motion
permalink: /automation/
---
There are various ways to trigger the motion sensor or doorbell that can be exposed by Homebridge Camera FFmpeg. Here are some guides on using each of them.

{% assign collection = site.automation | sort:"order" %}

{% for automation in collection %}
+ [{{ automation.title }}]({{ site.baseurl }}{{ automation.url }}){% if automation.comment %}
*{{ automation.comment }}*{% endif %}{% endfor %}
