---
layout: post
title: Adding your application to the Windows System Tray in .NET
date: 2006-05-18 00:00:00
tags: [c#,.net]
published: true
---

The NotifyIcon is the class used to create an icon in the Windows System Tray, and can be used instead of creating a task bar item.

**Creating a NotifyIcon on a Form**

The following example creates a NotifyIcon in the systray. When the form is minimised, it disappears 
from the task bar, when the NotifyIcon is clicked, the form is displayed in the same state it was in before it was minimised.

```csharp
private NotifyIcon notifyIcon = null;
private FormWindowState lastWindowState = FormWindowState.Normal;

private void FormMain_Load(object sender, System.EventArgs e)
{
  notifyIcon = new NotifyIcon(this.components);
  notifyIcon.Icon = Icon.FromHandle(((Bitmap)imageList.Images[1]).GetHicon());
  notifyIcon.Text = "Display";
  notifyIcon.Visible = true;
  notifyIcon.Click += new EventHandler(notifyIcon_Click);
}

private void notifyIcon_Click(object sender, EventArgs e)
{
  this.Visible = true;
  this.WindowState = lastWindowState;
}

private void FormMain_Resize(object sender, System.EventArgs e)
{
  if (this.WindowState != FormWindowState.Minimized) 
  {
    lastWindowState = this.WindowState;
  }
  this.Visible = (this.WindowState != FormWindowState.Minimized);
}
```
