---
layout: post
title: C# - Capturing process output
date: 2003-04-08 00:00:03
tags: [c#]
published: true
---

By running external commands using the System.Diagnostics.Process class, you can also retrieve the output from that command by using it's StandardOutput property:

```csharp
  Process p = new Process();
  StreamReader sr = null;
  ProcessStartInfo psi = new ProcessStartInfo("C:\Temp\test.bat");
  psi.UseShellExecute = false;
  psi.RedirectStandardOutput = true;
  psi.CreateNoWindow = true;
  p.StartInfo = psi;
  p.Start();
  sr = p.StandardOutput;
  string line = null;
  while ((line = sr.ReadLine()) != null) {
    Console.WriteLine(line);
  }
```