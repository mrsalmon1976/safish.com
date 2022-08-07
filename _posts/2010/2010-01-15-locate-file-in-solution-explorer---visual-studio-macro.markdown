---
layout: post
title: Locate File in Solution Explorer - Visual Studio Macro
date: 2010-01-15 08:57:00
tags: [visualstudio]
published: true
---

A colleague found [this blog post by Brian Schmitt](http://www.brianschmitt.com/2010/01/locate-file-in-solution-explorer-visual.html), 
which is one of the most useful little tips I've seen in ages.

I'm currently working on a solution with 30+ projects in it: and the Visual Studio items tracking REALLY annoys 
me when trying to navigate to files between projects that are far apart in the solution explorer tree. I've been 
wanting to turn this off for ages, but I also do like being able to locate the current file quickly in the solution 
explorer, so I just haven't got around to doing it. This Macro solves my problem perfectly.

To get this working:

1. Switch of auto tracking: Tools, Options, Projects and Solutions, turn off Track Active Items
2. Open the Macro Explorer: Tools, Macros, Macro Explorer
3. Under MyMacros, right-click Module1 (you can rename this if you like) and click New Macro
4. Replace the code of the Macro with the following:
```vb
Public Sub LocateFileInSolutionExplorer()
  DTE.ExecuteCommand("View.TrackActivityinSolutionExplorer")
  DTE.ExecuteCommand("View.TrackActivityinSolutionExplorer")
  DTE.ExecuteCommand("View.SolutionExplorer")
End Sub
```
5. Save and close the Macro Explorer
6. Go to Tools, Options, Environment Keyboard, and in the "Show commands containing" type in the macro name until it appears in the list below
7. Select the file in the list, focus on the "Press shortcut keys" input field and enter the key strokes you want to assign to the Macro. Like Brain, I used Alt+L,Alt+L. Assign it, and that's it.
8. Watch productivity soar.