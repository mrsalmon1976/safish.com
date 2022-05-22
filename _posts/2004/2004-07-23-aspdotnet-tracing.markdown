---
layout: post
title: ASP.NET Tracing
date: 2004-07-23 00:00:00
tags: [.net]
published: true
---

If you want to quickly create trace files (say you want to get an average load time for your page over 10 loads) you can use the 
.net tracing view trace results. There are two ways of doing this:

## Visibly

In the page tag on your .aspx file, add the Trace="True" attribute. This will spew out all trace information to your web page.

## Using an axd file

Add this to your web config:

```xml
<trace
	enabled="true"
	requestLimit="10"
	pageOutput="false"
	traceMode="SortByTime"
	localOnly="true"
/>
```

You can then access the trace output from the web browser e.g. http://localhost/mysite/trace.axd. If you use this method, be sure 
to remove the Trace attribute from your page tag in the .aspx file if you want the page's tracing to appear. For all pages you do 
not want traced, set Trace="False" and they will not output tracing or be logged in the Trace.axd file.