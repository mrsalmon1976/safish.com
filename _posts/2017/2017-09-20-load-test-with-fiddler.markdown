---
layout: post
title: Load test with Fiddler
date: 2017-09-20 16:25:00
tags: [fiddler]
published: true
---

A client reported an issue with one of our API endpoints today with a rather depressing problem - it worked fine with single posts, but multiple concurrent posts resulted in random errors.

I had the means to test the API with Fiddler, but that didn't help me much as that only sends one request at a time and I couldn't replicate the issue. I have used West Wind Web Surge in the past for personal work, but it requires a license for commercial use and I couldn't get it to play nicely with a self-certified test ceritificate, so I started Googling for an alternative.

It turns out you can do it easily with Fiddler. Execute the request that you want to stress test once, and then select the request once the response is received. Hit *Shift-R*, and a pop-up will appear asking how many simultaneous requests you want to make, defaulting to 5. Click OK on that, and Fiddler will send 5 concurrent requests!

![FiddlerRepeatRequests!](../assets/img/2017/fiddler-repeat-requests.png "fiddler-repeat-requests.png")




	
