---
layout: post
title: .NET Assembly Probing
date: 2009-10-06 13:37:00
tags: [.net]
published: true
---

I hate the way Windows Forms applications get built with all their binaries in a single folder. 
I also hate the publish options in Visual Studio - those crappy .application files stink in so 
many ways. I prefer to just deploy the executable and related assemblies using some kind of packaging tool.

The problem here is all the dll's by default need to be in the base appdomain directory, which 
can end up being a horrible mess in the base install directory. There is a configuration option 
you can use with your application, though, to tell it to search in other folders for required 
assemblies, like so:

```xml
<configuration>
  <runtime>
    <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
      <probing privatePath="bin;anotherbinsubfolder;yetanotherbin" />
    </assemblyBinding>
  </runtime>
</configuration>
```