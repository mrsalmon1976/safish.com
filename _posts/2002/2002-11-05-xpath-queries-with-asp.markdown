---
layout: post
title: XPath Queries with ASP
date: 2002-11-05 00:00:04
tags: [asp]
published: true
---

This shows you how to execute XPath queries. The server you are using will need to have ADO 2.6 
and Microsoft SQL Server 2000 installed. The query returns XML which can be manipulated using the MS DOM object.

```vb
  Dim conn    ' connection object
  Dim cmd     ' command object
  Dim strm    ' stream object
  Set conn = Server.CreateObject"ADODB.Connection.2.6")
  Set cmd = Server.CreateObject("ADODB.Command.2.6")
  conn.Open "connection string"
  Set cmd.ActiveConnection = conn
  Set strm = Server.CreateObject("ADODB.Stream.2.6")
  '   open the result stream so it may receive the output from the execute
  strm.Open
  '   set the command type to an XPath query
  cmd.Dialect = "{ec2a4293-e898-11d2-b1b7-00c04f680c56}"
  '   set the file name for the mapping schema
  cmd.Properties("Mapping Schema") = Server.MapPath(".") & "Yourfile.xdr"
  '   hook up the command to the result stream
  cmd.Properties("Output Stream") = strm
  '   set the actual text for the XPath command
  cmd.CommandText = "/ARTICLES/ARTICLE[A_ARTICLE_ID=1]"
  '   execute the command stream
  cmd.Execute , , 1024
  '   reset the stream's position in order to read it
  strm.Position = 0
  '   set the displayed results to the command's output
  txtResults = strm.ReadText
  '   clean up the output to make easier to read
  txtResults =  Replace(txtResults,">", ">")
  txtResults =  Replace(txtResults,"<", "<")
  txtResults = Replace(txtResults, "><", "><br><")
  strm.Close
  Set strm = Nothing
  Set cmd = Nothing
  conn.Close
  Set conn = Nothing
  Response.Write "<br>" & txtResults
```