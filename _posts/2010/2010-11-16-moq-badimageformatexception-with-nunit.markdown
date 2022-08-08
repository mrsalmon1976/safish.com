---
layout: post
title: Moq BadImageFormatException with NUnit
date: 2010-11-16 12:05:00
tags: [moq,nunit]
published: true
---

I ran into an issue today running a unit test where I kept getting a `System.BadImageFormatException` 
on the test dll. I incorrectly assumed this was NUnit - after digging around a bit I worked out it 
was actually Moq that was the source of the problem.

The return value of the object being verified existed in an assembly that was not being referenced by 
my test project, and Moq was falling over. Adding the reference sorted out the problem.

The exact error I encountered was:

`Test.MyLongNamespace.MyTestmethod: System.BadImageFormatException : [C:\Users\matt salmon\AppData\Local\Temp\ ....MyAssembly.DLL] The signature is incorrect.`