---
layout: post
title: Java - Setting the look and feel with Swing
date: 2001-10-04 00:00:00
tags: [java,swing]
published: true
---

To set the look and feel for your swing application, you can use the following code:

```java
    public static void main(String[] args) {
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        }
        catch (Exception ie) { 
            System.out.println("UI not supported.");
        }
        new MyClass();
    }
```

which will apply the platform standard look and feel.

However, this look and feel may not be supported so when coding your interface, be sure to make it look decent with the default swing interface. Possible values to pass the UIManager.setLookAndFeel() method are:

 - "javax.swing.plaf.metal.MetalLookAndFeel" - standard Java Look & Feel
 - "com.sun.java.swing.plaf.windows.WindowsLookAndFeel" - windows (only works on Win32 systems)
 - "com.sun.java.swing.plaf.motif.MotifLookAndFeel" - CDE/Motif Look & Feel
 - "javax.swing.plaf.mac.MacLookAndFeel" - Mac (only works on Macintosh)

To get a list of all the look and feel classes installed on your system, use the following:

```java
  UIManager.LookAndFeelInfo[] laf = UIManager.getInstalledLookAndFeels();
  for (int i=0; i < laf.length; i++) {
    System.out.println(laf[i].getClassName());
  }
``` 
  
To update the UI after your application has loaded, use the following code:

```java
  try {
    UIManager.setLookAndFeel("lookandfeelclassname");
    SwingUtilities.updateComponentTreeUI(frame);
  }
  catch (Exception exc) {
    System.out.println("Unable to change look and feel: " + exc.getMessage());
  }
```

**Removing bold font with Metal Look and Feel**

The metal look and feel has a font that defaults to bold - if you want to turn this off, add the following line before you call UIManager.setLookandFeel(..):

```java
  UIManager.put("swing.boldMetal", Boolean.FALSE);
```
