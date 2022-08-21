---
layout: post
title: MediaWiki on IIS working with no styles
date: 2016-01-04 19:58:00
tags: [mediawiki]
published: true
---

I decided to install MediaWiki today on one of our web servers, and set it up within IIS. However, although the site immediately served pages, all of them were displaying without any styles. The stylesheet request showed with a 200 response within Chrome so I didn't think there was anything wrong there and resorted to Google. However, I couldn't find anything on Google with an answer, so after an hour of trial and error I eventually ended up back in Chrome looking at the request.

It turns out the 200 response was incorrect - by following the link there was actually an error occurring when I looked at the contents of the response itself. It turns out, there was an error in the response: *C:\Windows\TEMP not writable*. The less engine being used was trying to dynamically compile the stylesheet and was failing as the IIS user under which the site was running didn't have access to the folder. I added write permissions to the user, and boom, it started working.