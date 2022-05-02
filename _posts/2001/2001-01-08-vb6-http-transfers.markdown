---
layout: post
title: Sending HTTP Requests using the MSXML2 object
date: 2001-01-08 00:00:07
tags: [vb,visualbasic]
published: true
---

The MSXML2 Library contains the class **ServerXMLHTTP30** which can be used to send HTTP requests and posts over the web.

**Example 1: Executing an ASP page on a remote web server**

```vb
  Dim objNetRequest As MSXML2.ServerXMLHTTP30
  Dim strURL As String
  strURL = "http://remote.com/YourPage.asp?param1=value1"
    
  Set objNetRequest = New MSXML2.ServerXMLHTTP30
  With objNetRequest
    .open "GET", strURL, False
    .send ("")
    MsgBox .responseText
  End With
  Set objNetRequest = Nothing
```

**Example 2: Posting a form to a remote page**

```vb
  Dim objNetRequest As MSXML2.ServerXMLHTTP30
  Dim strURL As String
  strURL = "http://remote.com/YourPage.asp?param1=value1"
    
  Set objNetRequest = New MSXML2.ServerXMLHTTP30
  With objNetRequest

    .open "POST", strURL, False
    .setRequestHeader "Content-Type", "text/xml"
    .send ("some text to be posted")
    MsgBox .responseText
  End With
  Set objNetRequest = Nothing
```
