---
layout: post
title: PHP - Dynamic file downloads
date: 2003-04-03 00:00:00
tags: [php]
published: true
---

The following forces the user's browser to open a save dialog for the file:

```php
  header("Content-type: application/pdf");
  header("Content-Disposition: inline; filename=downloaded.pdf");
```