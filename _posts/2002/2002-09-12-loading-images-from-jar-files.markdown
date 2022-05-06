---
layout: post
title: Loading images from Jar Files
date: 2002-09-12 00:00:00
tags: [java]
published: true
---

To load images into your application from a jar file:

```java
  try {
    URL url = FreeArchiver.class.getResource("/images/yourimg.gif"); 
    // the following line is necessary to be able to catch the exception if
    // the image does not exist in the resource
    url.getFile();
    Image img = Toolkit.getDefaultToolkit().getImage(url); 
    setIconImage(img);
  }
  catch (Exception e) {
    System.err.println("Unable to load image from archive.");
  }
```
  