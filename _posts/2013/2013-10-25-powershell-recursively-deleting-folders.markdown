---
layout: post
title: Powershell - Recursively deleting folders
date: 2013-10-25 14:55:00
tags: [powershell]
published: true
---

I haven't posted for ages as I am not doing any coding at the moment, but this little snippet that I used to know in my head completely eluded me today. I thought I'd post it here for when that happens again: this will delete ALL .svn folders in C:\Temp, recursively.

```powershell
gci C:\Temp -include .svn -Recurse -Force | Remove-Item -Recurse -Force
```