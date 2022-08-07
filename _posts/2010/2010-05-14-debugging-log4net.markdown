---
layout: post
title: Debugging log4net
date: 2010-05-14 14:11:00
tags: [log4net]
published: true
---

I ran into an issue with log4net today where it just would NOT log to the database. I knew the 
database connection settings were fine, and the config file was fine, but some minor changes I 
had made to field sizes resulted in the whole thing not logging.

The problem is, log4net, for obvious reasons, doesn't raise exceptions when it fails, so short 
of downloading the source and debugging, I was at a bit of a loss. Luckily, those clever fellas 
have given a way to log internal messages! It's pretty straightforward:

Add the following in your App.config/Web.config, under the configuration section:
 
```xml
<system.diagnostics>
  <trace autoflush="true">
    <listeners>
      <add
        name="textWriterTraceListener"
        type="System.Diagnostics.TextWriterTraceListener"
        initializeData="C:\emplog4net.txt" />
    </listeners>
  </trace>
</system.diagnostics>
```
Then, add the following key to the appSettings section in your web.config:

```xml
<add key="log4net.Internal.Debug" value="true"/>
```