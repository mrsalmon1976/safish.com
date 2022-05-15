---
layout: post
title: Java sockets - file transfers
date: 2003-12-14 00:00:00
tags: [java]
published: true
---

Assuming you have an open socket for doing the transfer (and without the correct try..catch error handling you require):

## Server

```java
  DataOutputStream dos = new DataOutputStream(socket.getOutputStream());
  File f = new File("C:\temp\myimage.jpg");
  FileInputStream fis = new FileInputStream(f);
  byte[] buffer = new byte[4096];
  int len;
  while ((len = fis.read(buffer)) > 0) {
    dos.write(buffer, 0, len);  
  }  
  fis.close();
  dos.close();
```

## Client

```java
  DataInputStream dis = new DataInputStream(socket.getInputStream());
  File fout = new File("c:\temp\newimage.jpg");
  FileOutputStream fos = new FileOutputStream(fout);
  byte[] buffer = new byte[4096];
  int len;
  while ((len = dis.read(buffer)) > 0) {
    fos.write(buffer, 0, len);
  }
  fos.close();
  dis.close();
```