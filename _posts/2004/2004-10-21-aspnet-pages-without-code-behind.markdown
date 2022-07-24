---
layout: post
title: ASP.NET pages without code-behind
date: 2004-10-21 00:00:00
tags: [asp.net]
published: true
---

Although this is not the best way to do it, there may be instances where you can't use a code-behind cs file. 
In that case, here is a basic example of how to set up the aspx file:

```html
<%@Page language="C#"%>
<%@ Import Namespace="System" %>
<script runat="server" language="C#">
private void Page_Load(object sender, System.EventArgs e){
  this.btn.Value = "New value!";
}
</script>
<html>
<head>
<title>Example</title>
</head>
<body leftmargin="0" topmargin="0">
<form id="frmMain" runat="server" method="GET">
  <input type="button" name="btn" id="btn" runat="server">
</form>
</body>
</html>
```

**Inheritance**

For sites that need a standard look and feel, you can still inherit from a base page class. This will require the creation of a base class, from which the .aspx files inherit, as follows:

**PageBase.cs**

```csharp
using System;
using System.Web.UI;

public class PageBase : System.Web.UI.Page {
  
  private string title = String.Empty;
  public string Title {
    get { return title; }
    set { title = value; }
  }

  protected override void Render(HtmlTextWriter writer) {
    writer.Write("<html><head><title>" +
      Title + "</title></head><body>");
    base.Render( writer );
    writer.Write("</body></html>");
  }
}
```

**Derived.aspx**

```html
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Web.UI" %>
<%@ Inherits="PageBase" Src="PageBase.cs" Debug="true" %>
<script runat="server" language="C#">
  private void Page_Load(object sender, System.EventArgs e){
    this.Title = "test title";
  }
</script>
<form id="Derived" method="post" runat="server">
    <p>
    This is a simple test page.
    </p>
</form>
```