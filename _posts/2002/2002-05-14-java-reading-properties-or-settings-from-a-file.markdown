---
layout: post
title: Java - Jars and Cabs
date: 2002-05-14 00:00:00
tags: [java]
published: true
---

You can load properties stored in a key=value format (each property on a new line) using an InputStream and a Properties object:

```java
  BufferedInputStream bis = null;
  Properties prop = null;
  String strFile = "package" + File.separator + "properties.file";
  // load properties file
  try {
    bis = new BufferedInputStream(new FileInputStream(new File(strFile)));  
  }
  catch (FileNotFoundException fnfe) {
    // throw error here
  }
  // load properties variables with details in the file
  prop = new Properties();
  try {
    prop.load(bis);
    // load all the properties
    strProperty = prop.getProperty("keyname");	
    // close the input stream
    bis.close();
  }
  catch (Exception ioe) {
    // throw error
  }
```