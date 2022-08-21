---
layout: post
title: Transforming XSLT with C#
date: 2005-10-14 00:00:00
tags: [c#]
published: true
---

XSL can be transformed programmatically as follows.

```csharp
XPathDocument xmlDoc = new XPathDocument(Server.MapPath("/Menu.xml"));
XslTransform xslt = new XslTransform();
xslt.Load(Server.MapPath("/Menu.xslt"));

Stream str = new MemoryStream();
XsltArgumentList arguments = new XsltArgumentList();
xslt.Transform(xmlDoc, arguments, str, null);
str.Flush();
str.Position = 0;

using (StreamReader sr = new StreamReader(str))
{
    string html = sr.ReadToEnd();
    sr.Close();
    return html;
}
```