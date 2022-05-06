---
layout: post
title: Java - Drag and Drop
date: 2002-05-16 00:00:00
tags: [java]
published: true
---

If, for example you want an application to support the dragging of files from a file list to your component, and your component to open those files, use the following code:

```java
//import drag and drop and datatransfer packages
import java.awt.dnd.*;
import java.awt.datatransfer.*;

public class MyClass extends AnotherClass {

  // declare variables - including a DropTarget object to which you will 
  // link a target component
  private DropTarget dropTarget = null;

  public MyClass() {
    // in constructor or initialisation method, initialise the DropTarget 
    // object and link it to your target component
    dropTarget = new DropTarget();
    try {
      dropTarget.addDropTargetListener(new DragDropListener());
    }
    catch (TooManyListenersException tmle) {
      // process error
    }
    yourComponent.setDropTarget(dropTarget);
  }
```
  
Write a private class for handling the drop action - note that different operating systems receive different file flavours - e.g. windows gets files as a filelist whereas Linux gets a long string

```java
  private class DragDropListener extends DropTargetAdapter {
		
  public void drop(DropTargetDropEvent dtde) {
    Transferable transferable = dtde.getTransferable();
    dtde.acceptDrop(dtde.getDropAction());
    DataFlavor[] flavors = transferable.getTransferDataFlavors();			
    boolean ok = false;
    for (int i=0; i<flavors.length; i++) {
      DataFlavor df = flavors[i];
      if (df.equals(DataFlavor.javaFileListFlavor)) {
        try {
          java.util.List<File> list = (java.util.List<File>)transferable.getTransferData(DataFlavor.javaFileListFlavor);
          for (int j=0; j<list.size(); j++) {
            openFile(list.get(j).getAbsolutePath());
          }
        }
        catch (Exception ex) {
          ex.printStackTrace();
        }
        ok = true;
      }
      else if (df.equals(DataFlavor.stringFlavor)) {
        try {
          String file = (String)transferable.getTransferData(DataFlavor.stringFlavor);
          String[] files = file.split(System.getProperty("line.separator"));
          for (int j=0; j<files.length; j++) {
            file = files[j].trim().replace("file://", "");
            openFile(file);
          }
        }
        catch (Exception ex) {
          ex.printStackTrace();
        }
        ok = true;
      }
    }
    dtde.dropComplete(true);
    if (!ok) {
      // raise error
    }
  }
```