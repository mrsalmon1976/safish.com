---
layout: post
title: Java - Getting a list of all system fonts
date: 2002-06-07 00:00:00
tags: [java]
published: true
---

The following code snippet returns all installed fonts.

```java
  GraphicsEnvironment g = GraphicsEnvironment.getLocalGraphicsEnvironment();
  String fonts[] = g.getAvailableFontFamilyNames();
  for (int i=0; i < fonts.length; i++) {
    System.out.println(fonts[i]);
  }
```