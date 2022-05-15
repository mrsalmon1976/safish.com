---
layout: post
title: Java - Running executables
date: 2003-02-03 00:00:00
tags: [java]
published: true
---

On Windows, to run an executable, fire it off using a new Process.

```java
try {     
  Runtime r = Runtime.getRuntime();
  Process p = r.exec("code.exe");
  InputStream in = p.getInputStream();               
  BufferedReader br = new BufferedReader(new InputStreamReader(in));                         
  while (true) {
    String str = br.readLine();
    if (str == null) break;
    System.out.println(str);
  }                         
}
catch ( Exception ee) {
  ee.printStackTrace();
}   
```