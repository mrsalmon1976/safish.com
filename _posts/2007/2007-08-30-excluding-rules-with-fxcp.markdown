---
layout: post
title: Excluding rules with FxCop
date: 2007-08-30 00:00:00
tags: [fxcop,c#]
published: true
---

Rules can be excluded in code, but adding the SuppressMessage attribute to your class, method, property etc.

For example, you have a property that is used in a web form but not in compiled code, you may want to exclude the performance warning that gets applied to the code not being called:

```csharp
[SuppressMessage("Microsoft.Performance", "CA1811:AvoidUncalledPrivateCode")]
public string MyProperty
{
  get 
  { 
    return 123; 
  }
}
```

You also need to declare conditional compile symbol for your project named CODE_ANALYSIS (just add the symbol name, that's all that needs to be done).