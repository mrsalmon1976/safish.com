---
layout: post
title: Visual Studio 2012 - Navigate to Current File in Solution Explorer
date: 2012-12-07 11:49:00
tags: [visualstudio]
published: true
---

We use Visual Studio 2012 with an older version of Resharper at work. I've been wanting to use Visual Studio 2012, 
but our version of Resharper isn't compatible, and although I can get by without most of the features, the one I 
REALLY REALLY REALLY miss is the ability to navigate to the current file in the solution explorer. With the help of an 
[existing extension](http://visualstudiogallery.msdn.microsoft.com/d2fc1e94-b85c-4a15-8569-390db1e04f47) I've finally managed to resolve that.

First off, download and install the extension mentioned above - you can also get it from within Visual Studio 2012 as per the below screen show:

![FindInSolutionExtension!](../assets/img/2012/find_in_solution_extension.png "find_in_solution_extension.png")

Once you've done that, you will be able to right-click on the current tab in Visual Studio to navigate directly to your file:

![FindInSolutionContext!](../assets/img/2012/find_in_solution_context.png "find_in_solution_context.png")

The last thing we want to do, is also hook this up to a keyboard command. I like to hook it up to "Alt-Shift-L"; to do this follow these steps:

- Click the Tools menu
- Click Customise...
- Click the Keyboard... button
- In the "Show commands containing" textbox type "FindInSolutionExplorer" (see screenshot below)
- Select the "Press shortcut keys" text box, and hit "Shift-Alt-L" (or whatever keyboard combination you want)
- Click "Assign", and then OK all the dialogs

![FindInSolutionAssignKey!](../assets/img/2012/find_in_solution_assign_key.png "find_in_solution_assign_key.png")
