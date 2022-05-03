---
layout: post
title: C# - Drag and Drop Files
date: 2001-08-20 00:00:00
tags: [c#]
published: true
---

When coding drag and drop operations in C# Windows applications, you need to complete two steps. Firstly, add a DragOver event to your form in which you change the cursor over your target application so the user can see they will copy the dragged object on the form:

```csharp
private void event_DragOver(object sender, System.Windows.Forms.DragEventArgs e)
{
  e.Effect = DragDropEffects.Copy;
}
```  
The second step involves handling the actual dropping of the file. This is done by adding a DragDrop event to your form, and retrieving the string array which Windows passes to your application containing the names of all the files dragged and dropped:

```csharp
private void event_DragDrop(object sender, DragEventArgs e) 
{
  // get reference to the dataobject
  DataObject dataObj = (DataObject)e.Data;
  // convert into array of file names
  string[] files = (string[])(dataObj.GetData(DataFormats.FileDrop));
  // loop through each argument, performing the appropriate file opening
  for (int i=0; i<files.Length; i++) 
  {
    this.OpenFile(files[i]);
  }
}
 ```
