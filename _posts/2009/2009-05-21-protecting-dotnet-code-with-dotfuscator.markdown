---
layout: post
title: Protecting .NET Code with Dotfuscator
date: 2009-05-21 10:41:00
tags: []
published: true
---

Although .NET compiles into binary .dlls, these assemblies are extremely easy to reverse-engineer using 
Reflector, or any other decent Reflection tool. Although it's not completely secure, the simplest way to 
protect your code is to run it through the free obfuscation tool that comes with Visual Studio: Dotfuscator 
Community Edition. This is available on your programs menu under Visual Studio Tools.

All you need to do, is open up the program and load up your assembly. There are piles of options available, 
but the default settings are generally fine for most cases. Under the Input tab you can add all your input 
assemblies, provide an output folder under the Build tab, and hit the run button - this will build copies 
of your dll's but the namespaces, classes, methods, etc are obfuscated into code that is extremely difficult 
to read. Of course, it is still readable: it can be decompiled and debugged, but it's a LOT harder to use, 
particularly for larger projects.

Some notes on the tool:

- when specifying the output directories it sometimes had issues with long folder names - using "C:Temp" was a simpler option and the build worked flawlessly from there
- the community edition can be upgraded to the Enhanced Edition, just by registering (which is free)
