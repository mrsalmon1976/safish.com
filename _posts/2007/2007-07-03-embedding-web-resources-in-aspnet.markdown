---
layout: post
title: Embedding web resources in ASP.NET
date: 2007-07-03 00:00:00
tags: [c#, asp.net]
published: true
---

Images, JavaScript, CSS, and pretty much anything you like can be embedded in your web dlls and referenced from code.

To use web resources, do the following:

First, add your resource file to your project, and set the property of the file (by right clicking it) to "Embedded Resource

In your C# code, you can refer to the file, for example, as follows:

```csharp
ClientScriptManager cs = Page.ClientScript;
Type type = this.GetType();  
if (!cs.IsClientScriptIncludeRegistered(type, "MyJavaScriptFile"))
{
  string url = cs.GetWebResourceUrl(type, "My.Controls.Resources.MyJavaScriptFile.js");
   cs.RegisterClientScriptInclude(type, "MyJavaScriptFile", url);
}  
```

Finally, you need to reference your web resource in the AssemblyInfo.cs file of your project:

```csharp
[assembly: WebResource("My.Controls.Resources.MyJavaScriptFile.js", "text/javascript")]
```

You can also get .NET to parse the embedded resource for code contained in the resouce, and substitute that for other values. 
For example, in an embedded CSS file you may want reference an embedded image. This can be done by

Adding PerformSubstitution=true to your AssemblyInfo.cs declaration:

```csharp
[assembly: WebResource("My.Controls.Resources.MyStyles.css", "text/javascript", PerformSubstitution = true)]
```

In MyStyles.css, add standard ASP include code:

```css
.myCssClass
{
  float:left;
  background:url("<%= WebResource("My.Controls.Resources.MyImage.gif") %>") no-repeat left top;
  text-decoration:none;
} 
```	