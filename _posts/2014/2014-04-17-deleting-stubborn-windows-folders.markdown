---
layout: post
title: Deleting stubborn windows folders
date: 2014-04-17 15:13:00
tags: []
published: true
---

Every now and then, even as an administrator on a machine, you hit a folder that you just cannot delete. The usual route is to take ownership of the folder and it's child files and folders, but once in a blue moon this doesn't work and you're stuck with a folder you can't delete. Assuming no locks on the files, I found today that issuing the following commands from an elevated-level command prompt worked where the GUI equivalents didn't:

```shell
takeown /F C:\Temp /R
cacls C:\Temp /T /e /g Administrators:f
rmdir /S C:\Temp
```
