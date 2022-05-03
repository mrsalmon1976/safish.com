---
layout: post
title: Send and receive data over HTTP using the Microsoft Internet Transfer Control
date: 2001-01-08 00:00:10
tags: [vb,visualbasic]
published: true
---

The following is an example of submitting credit card validation details.

```vb
  Dim inetTransfer As InetCtlsObjects.Inet
  Set inetTransfer = New InetCtlsObjects.Inet
  Dim strPostText As String
  Dim strPostHeader As String
  
' build up the text that will be posted to the authentication site
  strPostText = "VMSMerchantID=" & VMSMerchantID & _
    "&SSMerchantID=" & SSMerchantID & _
    "&VMMCMerchantID=" & VMMCMerchantID & _
    "&AttemptNum=" & AttemptNum & _
    "&CurrencyCode=" & CurrencyCode & _
    "&CountryCode=" & CountryCode & _
    "&RetOKAddress=" & objUtil.URLEncode(RetOKAddress, DEF_CODE_PAGE) & _
    "&RetNotOKAddress=" & objUtil.URLEncode(RetNotOKAddress, DEF_CODE_PAGE) & _
    "&MessageType=" & MessageType & _
    "&Amount=" & Amount & _
    "&CardType=" & CardType & _
    "&CardNumber=" & objUtil.URLEncode(CardNumber, DEF_CODE_PAGE) & _
    "&IssueNumber=" & IssueNumber & _
    "&ExpMonth=" & ExpMonth & _
    "&ExpYear=" & ExpYear & _
    "&StartMonth=" & StartMonth & _
    "&StartYear=" & StartYear
  ' add the form encoded header to the post so that the recipient sees the data as
  ' coming from a submitted form
  strPostHeader = "Content-Type: application/x-www-form-urlencoded" & vbCrLf
  ' use transfer object to execute the url
  inetTransfer.Execute AuthURL, "POST", strPostText, strPostHeader
  ' wait until the authorisation site returns an answer
  Do Until inetTransfer.StillExecuting = False
    DoEvents
  Loop
  ' return the code - this will be a zero-length string if the card is authorised
  Authenticate = inetTransfer.GetChunk(1024, icString)
  Set inetTransfer = Nothing
```
