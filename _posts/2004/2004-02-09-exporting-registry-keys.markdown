---
layout: post
title: Exporting Registry Keys
date: 2004-02-09 00:00:00
tags: []
published: true
---

For example, to export all keys under the ASP.NET software section to a file called "test.txt", run the following command:

```batchfile
REGEDIT /E test.txt HKEY_LOCAL_MACHINE\SOFTWARE\MICROSOFT\ASP.NET
```