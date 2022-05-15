---
layout: post
title: Linux - Mounting a Windows share
date: 2003-02-20 00:00:00
tags: [linux]
published: true
---

Mounting a folder on Windows machine

```shell
  mkdir /mnt/targetfolder
  /usr/bin/smbmount //WindowsMachineName/folder /mnt/targetfolder -o username=xxx,password=yyy
```