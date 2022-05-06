---
layout: post
title: Java - Adding actions to components
date: 2002-12-06 00:00:00
tags: [java]
published: true
---

Actions can be very useful when two objects must perform the same action. For example, if you want a menu item and a button to do the same thing, use an action as follows:

```java
  Action act = new AbstractAction("Does something") {
    public void actionPerformed(ActionEvent ae) {
      System.out.println("Something happened!");
    }
  };
  JMenuItem item = new JMenuItem(act);
```