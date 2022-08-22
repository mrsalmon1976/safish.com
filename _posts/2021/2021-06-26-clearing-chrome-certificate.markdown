---
layout: post
title: Clearing Chrome Certificates
date: 2021-06-26 18:59:00
tags: [chrome]
published: true
---

Chrome stores SSL certificate state per host in the browser history, which can become an issue when you generate a new self-signed certifcate and need to refresh it. To clear the browser history:
- Ctrl + Shift + Del
- Deselect all checkboxes except for "Cached images and files"
- Clear data

![ClearChromeCache!](../assets/img/2021/clear_chrome_cache.png "clear_chrome_cache.png")




	
