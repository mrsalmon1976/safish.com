---
layout: post
title: Custom Dictionary Sections in .NET Config Files
date: 2009-05-14 07:57:00
tags: [c#]
published: true
---

When you need to add complex configuration structures to .NET config files, you will generally create your own custom 
configuration section classes, and implement them within your application. However, if you just need a standard 
key/value pair, you don't need a custom configuration type at all. Instead, you can just define a section using the 
System.Configuration.DictionarySectionHandler, and there you go - no code required.

**Example**

Say, for instance, you want a list of status codes that get checked by your application:

In the App.config, define the section and implement the required values:

```xml
<configSections>
<section name="StatusCodes" type="System.Configuration.DictionarySectionHandler"  />
</configSections>

...

<StatusCodes>
  <clear />
  <add key="2" value="Two" />
  <add key="3" value="Three" />
  <add key="4" value="Four" />
  <add key="5" value="Five" />
</StatusCodes>
```

To read these values in code, all you need to do is the following, and you have a Hashtable containing all the values defined in the config file:

```csharp
Hashtable statusCodes = ConfigurationManager.GetSection("StatusCodes") as Hashtable;
```