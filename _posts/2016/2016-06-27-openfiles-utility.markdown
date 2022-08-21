---
layout: post
title: Openfiles utility
date: 2016-06-27 11:43:00
tags: [sqlserver]
published: true
---

I have no idea how I didn't know this existed - it's been around for ages. Openfiles.exe has existed on Windows machines since Windows XP, and this is something that I've struggled with for years!

```shell
Openfiles.exe /query /s file-server > openfiles.txt
```

This will export to a list all open files by user on that particular server as per below

```
ID       Accessed By          Type       Open File (Pathexecutable)          
======== ==================== ========== =====================================
31541186 eric              Windows    F:\..\Example\June
42278615 tom              Windows    E:\..\Example2\doc
46977638 john              Windows    E:\..\Hello
30870272 jane              Windows    E:\..Place\file.docx
```

If you would like to "kill" one of these locks, for example the lock Tom has on you can just disconnect them using the same utility, supplying the ID as follows:

```shell
openfiles.exe /disconnect /id 42278615 
```