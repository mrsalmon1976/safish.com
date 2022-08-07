---
layout: post
title: Using the WiX Installer
date: 2010-08-31 15:18:00
tags: [wix]
published: true
---

I've been playing with the [Wix Installer](http://wix.sourceforge.net/) for the last few days, and I'm 
absolutely amazed by it.  It's a real bastard to get into, but once you're up and running it's pretty 
incredible how much can be customised.  There is a LOT of documentation out there, but the most useful 
link I found was [this tutorial](http://www.tramontana.co.hu/wix/index.php#TOC) - it really is worth 
your while to read the entire tutorial BEFORE trying to create your own installation project.

Instead of creating another tutorial, I thought I'd list the items that tripped me up.

**Visual Studio 2010 Integration**

I downloaded Wix 3.0 (64 bit), and after installation, it wasn't available as a project within Visual Studio.  Download the beta version of 3.5 ' it seems pretty stable and integrates with Visual Studio,.

**No Wizard**

No wizard!?  WTF!?  It turns out it's XML-based ' you end up doing a lot of the setup by hand.  Deal with it.

**References in Visual Studio**

You will probably require extensions so you can customise the UI, or perhaps ensure the user has a .NET Framework installed.  I'm working in Visual Studio 2010, and I wasn't sure how to do this so I added compiler and linker options in the project properties.  You do not need to do this.  All you need to do is click 'Add Reference' on the project, and select the extension from the list that appears.  For example, if you want to add the .NET Framework prerequisites, right-click References, and select WixNetFxExtension.  That is all you need to do.

**Default UI**

The default installation dialog really sucked, and it took me a while to work out that you need to specify a different UI type.  That's what you get for not reading the above tutorial before creating your project.  You need to create a <UI> element, and specify the UIRef you want to use.

**Dialog Sequence**

Creating custom dialogs is pretty easy once you get the hang of it, but I struggled a little with 
navigation between dialogs.  Eventually I found the reference on the Wix site to a full list of Wix 
dialogs that you can navigate between at [http://wix.sourceforge.net/manual-wix3/WixUI_dialogs.htm](http://wix.sourceforge.net/manual-wix3/WixUI_dialogs.htm).

**Using the IIS Extension (For deploying web sites)**

This foxed me a little too.  Mostly, using the extensions just worked in Visual Studio, but the IIS extension doesn't.  You need to add the namespace reference, something along the lines of:

```xml
<wix xmlns="http://schemas.microsoft.com/wix/2006/wi" xmlns:iis="http://schemas.microsoft.com/wix/IIsExtension" xmlns:netfx="http://schemas.microsoft.com/wix/NetFxExtension">
```

You can then use the extension elements as follows:

```xml
<iis:WebSite Id='DefaultWebSite' Description='Default Web Site'>
  <iis:WebAddress Id='AllUnassigned' Port='80' />
</iis:WebSite>
```