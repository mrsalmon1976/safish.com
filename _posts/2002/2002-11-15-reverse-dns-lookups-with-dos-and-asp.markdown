---
layout: post
title: Reverse DNS Lookups with DOS and ASP
date: 2002-11-15 00:00:00
tags: [asp,dos]
published: true
---

=DOS=

```batchfile
nslookup <ip_address>
```

=ASP=

You need Windows Script Host 2.0 or higher installed in order to do this, but on a Windows NT or Windows 2000 machine you can perform reverse DNS lookups using the following code:

```vb
  Dim oFs
  Dim oShell 
  Dim oStream
  Dim temp 
  Dim sHost
  sHost = Request.Form("sHost")
  ' create shell object
  Set oShell = Server.CreateObject("Wscript.Shell")
  ' run NSLookup via command prompt
  oShell.Run "%ComSpec% /c nslookup " & sHost & "> C:" & sHost & ".txt", 0, True

  ' open the temp text file and write the contents to your page
  Set oFS = Server.CreateObject("Scripting.FileSystemObject")
  Set oStream = oFS.OpenTextFile("C:" & sHost & ".txt")

  Do While Not oStream.AtEndOfStream
    Response.Write "<br>" & Trim(oStream.Readline)
  Loop
  
  ' clean up    
  oStream.Close
  oFS.DeleteFile "C:" & sHost & ".txt"
```