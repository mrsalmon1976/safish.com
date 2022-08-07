---
layout: post
title: NServiceBus error - Value cannot be null, Parameter name meth
date: 2010-02-26 08:29:00
tags: [nservicebus]
published: true
---

It's been a while since I used NServiceBus and I got this annoyingly cryptic error message this morning:

```
Value cannot be null.
Parameter name: meth
```

I finally found [this post](http://tech.groups.yahoo.com/group/nservicebus/message/3219) about it and 
it's actually a fairly obvious mistake - I had added property without a setter on one of the objects 
that needed to be serialized as part of my message. The error message was unfortunately cryptic enough 
for me to take a while to find it. I thought I'd post this on here for my own future reference.