---
layout: post
title: Combining .NET Assemblies with ILMerge
date: 2010-08-03 11:32:00
tags: [.net]
published: true
---

I Used [ILMerge](http://www.microsoft.com/downloads/details.aspx?familyid=22914587-b4ad-4eae-87cf-b14ae6a939b0&displaylang=en) 
today for the first time, and it's great. [Aspnet_merge.exe](http://msdn.microsoft.com/en-us/library/bb397866.aspx) is actually 
based on this tool, and it allows you to combine all your assemblies into a single exe or dll - great for simple deployment.

It gets installed by default to C:\Program Files (x86)\Microsoft\ILMerge, with fairly decent documentation. To consolidate 
a fairly simple Windows exe with three dlls into a single exe, all I did was the following:

```shell
ILMerge.exe /t:winexe /out:Output.exe /ndebug Program.exe Lib1.dll Lib2.dll Lib3.dll
```