---
layout: post
title: Java - Double-click Events
date: 2001-10-04 00:00:01
tags: [java]
published: true
---

```java
  private class YourMouseListener extends MouseAdapter {

    public void mouseClicked(MouseEvent event) {
      Object object = event.getSource();
      //Perform actions on double-click events
      if (event.getClickCount() == 2) {
        // do action here
      }
    }
  }
```
