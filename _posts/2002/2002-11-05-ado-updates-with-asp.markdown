---
layout: post
title: ADO Updates with ASP
date: 2002-11-05 00:00:00
tags: [asp]
published: true
---

Update database values with ADO/ASP

```vb
  Dim Conn, rs, sql

  ' Open connection
  Set Conn = Server.CreateObject("ADODB.Connection")
  Conn.Open "DSN=MyDSN; UID=Internet"
    
  Set rs = Server.CreateObject("ADODB.RecordSet")
  ' Open recordset using sql string
  sql = "SELECT * FROM MyTable"
  rs.Open sql, Conn, 1, 3
    
  ' loop through recordset updating data
  While NOT rs.EOF
    If rs("MyField") = 20 Then
      rs("Name") = rs("Name") & "+"
      rs.Update
    End If
    Response.Write(rs("Name") & ".<br>")
    rs.MoveNext
  Wend
    
  ' Close the recordset and connection
  rs.Close
  Conn.Close
  Set rs = Nothing
  Set Conn = Nothing
```