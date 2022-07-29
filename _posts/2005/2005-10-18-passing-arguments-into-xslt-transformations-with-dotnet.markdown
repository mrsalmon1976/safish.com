---
layout: post
title: Passing arguments into XSLT transformations with .NET
date: 2005-10-18 00:00:00
tags: [c#,xsl]
published: true
---

XSL can be transformed programmatically as follows.

If you were using C#, you would add an argument to your transformation with the following code:

```csharp
XsltArgumentList arguments = new XsltArgumentList();
arguments.AddParam("arg_name", "", "arg_value");
xslt.Transform(xmlDoc, arguments, str, null);
```

Using the values passed in is simple, all you need to do is declare the parameter and refer to the parameter with the name prefixed with a "$":

```xml
  <xsl:param name="arg_name" />

  <xsl:value-of select="$arg_name" /> 
```