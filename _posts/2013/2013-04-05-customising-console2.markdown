---
layout: post
title: Customising Console2
date: 2013-04-05 08:08:00
tags: []
published: true
---

Every time I get a new machine, I always have to set up Console2 again, and because I have the memory of a goldfish, I always forget how. So this time around, I thought I would blog the minor changes I make.

**Add Visual Studio Command Prompt**

The first thing I like to do is make sure I can open tabs to the relevant Visual Studio command prompts. Go to Edit...Settings...Tabs, and then set up a new tab as per the screenshot below (you can copy and paste the actual location of your command prompt by viewing the properties of your visual studio command prompt shortcut):

![CustomisingConsole2!](../assets/img/2013/adding-vs-command-prompt-to-console2.png "adding-vs-command-prompt-to-console2.png")

I also like to set up a custom icon for the prompt, but that is obviously optional.

**Add shortcuts to your context menu**

```
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOTDirectoryshellConsole2]
@="Open Console2"
[HKEY_CLASSES_ROOTDirectoryshellConsole2command]
@="C:\\Matt\Dropbox\\Utilities\\Console2\\Console.exe -d %1" 
[HKEY_CLASSES_ROOTDirectoryBackgroundshellConsole2]
@="Open Console2"
[HKEY_CLASSES_ROOTDirectoryBackgroundshellConsole2command]
@="C:\\Matt\\Dropbox\\Utilities\\Console2\\Console.exe -d  \"%V\"" 
```

Create a console2.reg file with the above as contents, making sure you change the paths to correctly point to your console2.exe file. This will give you two context menu additions:

- When you right-click a folder, you will have an option to open a console at that folder location
- When you right-click inside a directory, you will have an option to open a console at that directory location