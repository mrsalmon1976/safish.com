---
layout: post
title: Determining the target .NET Framework version of a .NET assembly
date: 2010-11-17 13:31:00
tags: [.net]
published: true
---

To determine which version of the .NET framework an assembly supports, you can use ILDASM.

Open up a visual studio command prompt, and type the following:

```batch
ildasm.exe C:\Yourdll.dll /metadata[=MDHEADER] /text /noil
```

You'll get a large amount of indecipherable data, but right at the top, you'll see something to the effect of

```
// Metadata section: 0x424a5342, version: 1.1, extra: 0, version len: 12, version: v4.0.30319
```

where the highlighted piece gives you the supported version.

Alternatively, you can just open ildasm (just type ildasm at the command prompt), and open up the dll - you can see the metadata version right at the top by double-clicking "MANIFEST":

![Manifest!](../assets/images/2010/Manifest.png "Manifest.png")

Useful!
