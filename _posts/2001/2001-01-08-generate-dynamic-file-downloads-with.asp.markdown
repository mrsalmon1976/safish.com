---
layout: post
title: Generate dynamic file downloads with ASP
date: 2001-01-08 00:00:02
tags: [asp]
---

Should you ever require to generate a download file from ASP, where the file doesn't actually exist, but is 
perhaps the results of a query, here is the code. Works in IE4+ and NN2+. Without the "content-disposition" 
header, the filename the browser prompts to save is the name of the ASP page (eg. download.asp) - you can 
replace "data.csv" with anything you like.

```vb
  Response.ContentType = "application/csv"
  Response.AddHeader "content-disposition", "inline; filename=data.csv"
  Response.Write("one,two,three" & chr(13) & chr(10))
  Response.Write("1,2,3" & chr(13) & chr(10))
  Response.Write("1,2,3" & chr(13) & chr(10))
```

