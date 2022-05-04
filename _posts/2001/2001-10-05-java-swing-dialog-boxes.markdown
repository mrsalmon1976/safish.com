---
layout: post
title: Java - Swing Dialog Boxes
date: 2001-10-05 00:00:01
tags: [java,swing]
published: true
---

Dialog boxes using the swing set can be created using a combination of the **JOptionPane** and **JDialog** classes. For example, to create an error box:


```java
JOptionPane pane = new JOptionPane(msg, JOptionPane.ERROR_MESSAGE);
JDialog dialog = pane.createDialog(owner, title); 
dialog.show();
```
