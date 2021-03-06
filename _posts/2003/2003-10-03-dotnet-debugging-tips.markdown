---
layout: post
title: .NET Debugging Tips
date: 2003-10-03 00:00:00
tags: [.net,c#]
published: true
---

## Conditional Debugging Attribute

You can use an attribute to to decorate a method so that the method will only be called whilst in debug mode: it gets ignored in release mode. For instance, you could have a method that displays useful information in debug but not release:

```csharp
  [System.Diagnostics.Conditional("DEBUG")]
  private void DisplaySomeData()
  {
    // Display the data if in debug mode.
    this.TextBox1.Title = this.objectData.ToString();
  }
```

## DebuggerStepThrough

Using this attribute you'll be able to debug whilst ignoring the decorated class or method. In the following example, the method will be ignored by the debugger:

```csharp
  [System.Diagnostics.DebuggerStepThrough()]
  private void DoNothing()
  {
    return null;
  }
```

## Debugging your applications without Visual Studio.NET

The .NET Framework comes with a debug tool called the CLR Debugger, and is located in the GuiDebug folder in the Framework folder on the machine where you installed the SDK.

To debug your application, add the /debug tag to your compilation script e.g. csc yourfile.cs /debug. This will create a .pdb file which contains the debugging information.

With the debugger, now select the exe that was generated by clicking "Debug" and then "Program to Debug". You can now run and debug your application with breakpoints etc just as you do in the standard Visual Studio.NET IDE.

