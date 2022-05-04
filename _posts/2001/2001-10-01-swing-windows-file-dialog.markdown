---
layout: post
title: Java / Swing - Showing Windows File Dialog Box
date: 2001-10-01 00:00:00
tags: [java]
published: true
---

To show a standard windows dialog box, you need to import the **java.awt.FileDialog** class, which can be used to display files on your machine in the following way:

```java
  FileDialog dlg = new FileDialog(this, "What file do you want to save?", FileDialog.SAVE);
  dlg.setFile("*.java");		// file extension filter
  dlg.setDirectory(".");		// initial directory
  dlg.show();
  String saveFile;
  if((saveFile = d.getFile()) != null) {
    filename.setText(saveFile);
    myTextField.setText(d.getDirectory());
  }
```

Alternatively, if you want to maintain a standard swing look and feel, you can import the **javax.swing.JFileChooser** class, which can be used in the same way.

```java
  JFileChooser chooser = new JFileChooser(".");
  // chooser.setFileFilter(filter); 
  chooser.setFileHidingEnabled(false);
  int returnVal = chooser.showOpenDialog(parent); 
  if(returnVal == JFileChooser.APPROVE_OPTION) { 
    System.out.println("You chose to open this file: " + chooser.getSelectedFile().getName()); 
    System.out.println("You chose to open this directory: " + chooser.getCurrentDirectory()); 
  } 
```

To save files using the swing set, use the following code:

```java
  JFileChooser saver = new JFileChooser(".");
  saver.setFileHidingEnabled(false);
  int returnVal = saver.showSaveDialog(parent); 
  if (returnVal == JFileChooser.APPROVE_OPTION) {
    File selFile = saver.getSelectedFile();
    if (selFile.exists()) {
      int sel = JOptionPane.showConfirmDialog(parent, "Overwrite file " + 
        selFile.getAbsolutePath() + "?", "File exists",
        JOptionPane.YES_NO_OPTION, JOptionPane.ERROR_MESSAGE);
      if (sel == JOptionPane.NO_OPTION) {
        // do NO overwrite action here
        return;
      }
    }
    // do save action here
  } 
```