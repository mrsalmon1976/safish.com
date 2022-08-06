---
layout: post
title: FxCop - Excluding rules in code
date: 2009-05-11 15:04:00
tags: [fxcop]
published: true
---

One of the tools we use at my current job to validate code as part of our automated build is FxCop. It 
can be a pain, but we've found it very useful in terms of standardising our code and rooting out all 
those un-used variables that seem to grow to epic proportions with a project of any decent size.

However, as with all tools, it's not perfect, and sometimes it throws errors that really aren't of any 
significance and can be safely ignored. This can be done from within the FxCop project, but it can also 
be done via code, which means it will be forever ignored, even if the FxCop project file changes.

This is a 2-step process:

1. Declare conditional compile symbol for your project named CODE_ANALYSIS (In Visual Studio 2005 under the Build Tab of the project properties, there is a "Conditional compilation symbols" input field)
2. Mark your method or property with a "SuppressMessage" attribute, as follows:

```csharp
[SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
public string MyProperty
{
  get { return 123; }
}
```

The first parameter is the category of the error, and the second is the rule code and name split by a colon.