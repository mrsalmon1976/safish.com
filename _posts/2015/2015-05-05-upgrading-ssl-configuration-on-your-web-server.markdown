---
layout: post
title: Upgrading SSL configuration on your web server
date: 2015-05-05 11:33:00
tags: [iis]
published: true
---

I ran SSL tests on one of our web servers recently and found it was horribly out of date, receving an "F" from QULAYS SSL Labs SSL Server Test. Boooo. The problem was, in the past this was a pain in the butt as you had to pile into the registry and try and disable the old SSL support and various other manual steps.

Thanks to the awesomeness of Google, however, I found this little gem: [https://www.hass.de/content/setup-your-iis-ssl-perfect-forward-secrecy-and-tls-12](https://www.hass.de/content/setup-your-iis-ssl-perfect-forward-secrecy-and-tls-12). 
Run Powershell script, test, cheer. A great big thanks to the author for that script - it worked perfectly, and our web site now gets a nice green A rating.

![SSLLabsARating!](../assets/img/2015/ssllabs-a-rating.png "ssllabs-a-rating.png")
