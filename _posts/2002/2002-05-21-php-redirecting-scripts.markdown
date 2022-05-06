---
layout: post
title: PHP - Redirecting Scripts
date: 2002-05-21 00:00:00
tags: [php]
published: true
---

In order to transfer the user to another page programatically, write a location header to the page, for example:

```php
  // turn buffering on, so no other content is written to page before the 
  // redirect headers
  ob_start();
  ..
  ..
  // remove data in buffer and write header
  ob_clean();
  header("Location: mypage.htm");
  exit;
```