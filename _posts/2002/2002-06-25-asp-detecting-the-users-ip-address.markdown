---
layout: post
title: ASP - Detecting the user's IP Address
date: 2002-06-25 00:00:00
tags: [asp]
published: true
---

The following code can be used to determine the current user's IP address using ASP 3.0

```vb
  forwardIP = Request.ServerVariables("HTTP_X_FORWARDED_FOR")
  remoteAddr = Request.ServerVariables("REMOTE_ADDR")

  ' check to see if the user is behind a proxy (forwardIP will be populated)
  If forwardIP = "" then
    Response.Write "Your IP address is: " & remoteAddr
  Else
    Response.Write "Your IP address is: " & forwardIP & "<br>"
    Response.Write "Your proxy address is: " & remoteAddr
  End
```