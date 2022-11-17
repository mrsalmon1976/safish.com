---
layout: post
title: Find and replace lines not starting with a string with Notepad++
date: 2022-11-17 09:37:00
tags: [notepad++]
published: true
---

I received some large CSV files that needed importing into a database, but unfortuntely there were hundreds of lines that 
contained line feeds so they would not import correctly.

Every "valid" line started with *"person@email.com"*, so it was easy to find invalid lines with the following:


![Notepad++ Doesn't Start With!](../assets/img/2022/C:\Matt\code\safish.com\assets\img\2022\Notepad++_Find_NotStartsWith.png "Notepad++_Find_NotStartsWith.png")

Using this, I then created a macro as that was:

* F3 - find next instance
* Backspace - removes the linefeed
* Type "\r\n" so the fact that there was a line feed can still be determined

You can then run the macro to the end of the file, and all records were formatted to not span multiple lines.

![Notepad++ Run Macro!](../assets/img/2022/Notepad++_RunMacro.png  "Notepad++_Find_NotStartsWith.png")

