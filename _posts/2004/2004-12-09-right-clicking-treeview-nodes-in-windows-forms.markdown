---
layout: post
title: Right-clicking Treeview Nodes in Windows Forms
date: 2004-12-09 00:00:00
tags: [c#]
published: true
---

Right-clicking on a node in a treeview does not change the SelectedNode property, therefore it is impossible to get a handle on the current node within, for example, a context menu when using this method.

Instead, use a mouse event in conjunction with the treeview's "GetNodeAt" method to get a handle on the node:

```csharp
private void treeView_MouseUp(object sender, MouseEventArgs e)
{
  if (e.Button == MouseButtons.Right) 
  {
    TreeNode node = treeView.GetNodeAt(e.X, e.Y);
    if (node != null) 
    {
      MessageBox.Show(node.Text);
    }
  }
}
```