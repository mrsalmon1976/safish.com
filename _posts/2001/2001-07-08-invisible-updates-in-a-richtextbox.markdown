---
layout: post
title: Invisible updates in a RichTextBox
date: 2001-07-08 00:00:00
tags: [csharp]
published: true
---

If, for example you are extending the RichTextBox class in order to create a text editor, you might want to change the colour of certain words in a line. 
However, in order to do this you need to "Select" the text you want to change, which results in the control flashing as the user types. This can be prevented 
by sending a message to windows telling it not to repaint the control.

I use the following two methods to achieve this - firstly calling the _Lock_ method to prevent the updates from being visible, then doing my updates, and 
then calling the _Unlock_ method which results in Windows repainting the control again (calling the _Invalidate_ method). Both methods are specific to the 
RichTextBox control as they also set it's _ReadOnly_ property before sending the update message.

```csharp
  private void Lock() 
  {
    Message msg = Message.Create(this.Handle, 11, new System.IntPtr(0), new System.IntPtr(0));
    this.WndProc(ref msg);
    this.ReadOnly = true;
  }

  private void UnLock() 
  {
    this.ReadOnly = false;
    Message msg = Message.Create(this.Handle, 11, new System.IntPtr(1), new System.IntPtr(0));
    this.WndProc(ref msg);
    this.Invalidate();
  }
```
