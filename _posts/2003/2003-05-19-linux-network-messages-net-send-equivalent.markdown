---
layout: post
title: Linux network messages (net send equivalent)
date: 2003-05-19 00:00:00
tags: [linux]
published: true
---

In Windows, you can use _net send_ to send instant messages to another machine.

```batchfile
net send machinename message 
```

You can do this using samba from a Linux machine too with:

```shell
smbclient -M machinename
```
