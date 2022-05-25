---
layout: post
title: HTTP Requests with Java
date: 2004-09-23 00:00:00
tags: [java]
published: true
---

HTTP requests are very simple with Java:

```java
import java.net.*;
import java.util.*;
import java.io.*;

public class Mine {
  public static void main(String args[]) {

    ObjectInputStream is = null;
    URL url = null;
    String  uri = "http://servername:port/yourservlet";
    HashMap hash = new HashMap();
    try {
      // calling the servlet by passing params
      url = new URL(uri + "?pm1=val1&pm2=val2");
            
      // open input stream and read the hashmap
      // returned by the servlet
      is = new ObjectInputStream(url.openStream());
      hash = (HashMap) is.readObject();
      // print it out
      System.out.println(hash);
    } 
    catch (Exception e) {
      e.printStackTrace(System.err);
    }
  }
}
```