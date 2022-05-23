---
layout: post
title: ASP - Writing to text files
date: 2004-09-22 00:00:00
tags: [asp]
published: true
---

The following code will create a text file called testfile.txt in the root of the C: drive, overwriting an existing file with the same name.

```vb
Set objFS = CreateObject("Scripting.FileSystemObject")
Set objStream = fs.CreateTextFile("c:\testfile.txt", True)
objStream.WriteLine("This is a test.")
objStream.Close
Set objStream = Nothing
Set objFS = Nothing
```
