---
layout: post
title: Java - Undo / Redo functionality
date: 2002-05-14 00:00:01
tags: [java]
published: true
---

Undo / Redo functionality can be added to document classes in the javax.swing.text package very easily. All you need to do is add a listener for changes, and use a UndoManager to alter those changes.

For example, you have a JTextPane which is using a DefaultStyledDocument as it's document source:

```java
public class MyTextPane extends JTextPane {
  
  // create undo manager
  private UndoManager undo = new UndoManager();
  
  public MyTextPane() {
    ...
    // add undoable edit listener to the document
    this.getStyledDocument().addUndoableEditListener(new MyUndoableEditListener());
  }

  // add undo method
  public void undo() {
    undo.undo();
  }

  // add redo method
  public void redo() {
    undo.redo();
  }

  // create private class for listening to document changes
  private class StdUndoableEditListener implements UndoableEditListener {
    public void undoableEditHappened(UndoableEditEvent e) {
      // add each edit to the undo manager
      undo.addEdit(e.getEdit());
    }
  }
}
```