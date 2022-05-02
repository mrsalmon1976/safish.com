---
layout: post
title: Halting Program Execution with VB6
date: 2001-01-08 00:00:06
tags: [vb.visualbasic]
published: true
---

Say for example you want to perform batch updates, but only want to do 100 records every minute. If you're using a 
DLL or ActiveX EXE to do the job, the easiest way to halt program execution is to use the Windows API Sleep method. 
Just add the following declaration to a module in your project, and specify the number of seconds times by 1000 
(to get milliseconds) that you want your program to sleep for in between updates.

Note: This call stops ALL the threads in your application. If you only want to pause the processing of a single thread, use the Wait() API function.

```vb
    Declare Sub Sleep Lib "kernel32.dll" (ByVal dwMilliseconds As Long)
```



