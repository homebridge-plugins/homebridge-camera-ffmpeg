---
layout: default
---
<header class="post-header">
  <h1 class="post-title p-name" style="margin: 0">{{ page.title | escape }}</h1>
  <p style="margin: 0">{{ page.comment }}</p>
  <p class="post-meta" style="margin: 0">
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
    {{ page.date | date: date_format }} • {{ page.author }}
  </p>
</header>

<div class="post-content e-content">
  {{ content }}
</div>
