---
layout: post
title: C# Windows API Calls
date: 2003-04-30 00:00:00
tags: [c#]
published: true
---

If, for example you want to send a message to you window to bring it to the top of the z-order, add the following code into your class declaration, e.g.:

```csharp
  public class MyClass {

    private bool x = false;

   [DllImport("user32.dll",EntryPoint="BringWindowToTop")]
   private static extern int BringWindowToTop(int hWnd);
```

The EntryPoint is not required - if omitted the entry point into the dll will be the name of the method.

To use the imported method, just call as normal, e.g.

```csharp
  BringWindowToTop(MyForm.Handle.ToInt32());
```