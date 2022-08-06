---
layout: post
title: Running Selenium RC as a Windows Service
date: 2009-09-18 11:28:00
tags: [selenium]
published: true
---

We've recently started using [Selenium](http://seleniumhq.org/) as a testing tool at work. The IDE is great, particularly for filling in forms during development, but I'm a stickler for automated testing.

Selenium does off Selenium RC, which combined with nUnit allows for this in a variety of programming languages. The problem here, is that the server is a jar file, and I wanted it running as a windows service on our build server.

Anyway, I found a [great article on tacktech.com](http://www.tacktech.com/display.cfm?ttid=197) that shows how to run just about anything as a windows service - and I successfully used that article to get Selenium RC running as windows service on our build server. Here are the steps:

1. Install the latest Java runtime if you don't have it installed already
2. Install the Selenium server (e.g. C:\Seleniumselenium-server-1.0.1
3. Download srvany.exe and instsrv.exe (these are part of the Microsoft Windows Resource Kit - you will need to download the correct version for your OS) and copy these files to a location on your server (e.g. C:\reskit)
4. Browse to this folder, and type: instsrv "Selenium RC" "C:\reskit\srvany.exe" - this will create the windows service named "Selenium RC", which will now be installed as a Windows service, although it won't start up yet
5. Open up regedit, and browse to HKEY_LOCAL_MACHINE\SYSTEM\CurrentControl\SetServices\Selenium RC
6. Right-click "Selenium RC" in the tree, and click New - Key, and add a key called "Parameters"
7. Open Parameters, and create a new string value called "Application"
8. Add the following to the data value for the new string value: "C:\Program Files (x86)\Java\jre6\bin\java.exe" -jar "C:\Seleniumselenium-server-1.0.1\selenium-server.jar", substituting paths to the java exe and the selenium server jar file where appropriate
9. Load up the windows services console (services.msc) and start the service
