---
layout: post
title: PHP - Cookies
date: 2002-05-23 00:00:00
tags: [php]
published: true
---

Setting cookies, is relatively simple, using the following code:

```php
  setcookie("cookiename", $cookie_val, time() + 3600, "", "");
```

Note: You should set all the above parameters to ensure that the cookie gets written in Internet Explorer 5+. Also, the PHP manual mentions another cookie for secure connections as an additional parameter. For some reason, setting this parameter causes the cookie not to be written to IE 5+, so be sure not to set it.

To retrieve the cookie, use the following:

```php
  $HTTP_COOKIE_VARS["cookiename"]
```

To delete the cookie:

```php
  // set the cookie expiry date to some time in the past
  setcookie ("cookiename", "", time() - 3600, "", "");
```