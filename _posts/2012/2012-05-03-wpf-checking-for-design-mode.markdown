---
layout: post
title: WPF - Checking for Design Mode
date: 2012-05-03 09:58:00
tags: []
published: true
---

In code, you can check to see if your component is in design mode with the following code:

```csharp
if (!DesignerProperties.GetIsInDesignMode(this))
{
    // do stuff
}
```

This is useful when you want to add code in the constructor that won't work when rendering at design-time.