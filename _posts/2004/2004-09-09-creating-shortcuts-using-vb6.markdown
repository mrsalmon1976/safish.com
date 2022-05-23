---
layout: post
title: Creating shortcuts using VB6
date: 2004-09-09 00:00:00
tags: [vb]
published: true
---

In your VB Project, to create a shortcut you need to add a reference to the Windows Script Host Object Model - if 
this is not available find the file WSHOM.OCX.

**Example:** create a shortcut to your application on the desktop

```vb
Dim wsShell As IWshShell_Class
Dim wsShortcut As IWshShortcut_Class
Set wsShell = New IWshShell_Class
Set wsShortcut = wsShell.CreateShortcut(wsShell.SpecialFolders("Desktop") + "test.lnk")
With wsShortcut
	.Arguments = "1 2 3"
	.Description = "test shortcut"
	.IconLocation = "app.exe,1"
	.TargetPath = "C:me.exe"
	.WindowStyle = 3
	.WorkingDirectory = "C:temp"
	.Save
End With
Set wsShortcut = Nothing
Set wsShell = Nothing
```