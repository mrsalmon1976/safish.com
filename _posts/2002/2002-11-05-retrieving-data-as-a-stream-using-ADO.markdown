---
layout: post
title: Retrieving data as a stream using ADO
date: 2002-11-05 00:00:05
tags: [asp]
published: true
---

Use ADO to return data as a stream. This is extremely useful for XML queries, allowing you retrieve a large XML dataset into a stream in one go.

```vb
  Dim m_oConn			' connection object
  Dim m_oCmd			' command object
  Dim m_strQuery		' query string
  Dim m_oStreamQuery	' query stream to retrieve info
  Dim m_oStreamOut	' output stream
  Dim m_oDict			' dictionary object
  ' open connection to the database
  Set m_oConn = Server.CreateObject("ADODB.Connection")
  m_oConn.Open strConn
  ' set up XPath query
  m_strQuery = "" _ 
    & "exec sp_GetDropDownBoxInfoAsXML"
  ' open up stream objects
  Set m_oStreamQuery = Server.CreateObject("ADODB.Stream")
  Set m_oStreamOut = Server.CreateObject("ADODB.Stream")
  ' initialize the query streams
  m_oStreamOut.Open
  With m_oStreamQuery
    .Open
    .WriteText m_strQuery, 0
    .Position = 0
  End With
  ' create and set up command object
  Set m_oCmd = Server.CreateObject("ADODB.Command")
  With m_oCmd
    Set .ActiveConnection = m_oConn
    .CommandStream = m_oStreamQuery
    .Dialect = "{5D531CB2-E6Ed-11D2-B252-00C04F681B71}"
    .Properties("Output Stream") = m_oStreamOut
    .Execute , , 1024
  End With
  ' create dictionary object
  Set m_oDict = Server.CreateObject("Commerce.Dictionary")
  m_oDict.strXML = m_oStreamOut.ReadText
  Set Global_Load_DDB_Info = m_oDict
  ' clean up
  Set m_oDict = Nothing
  m_oStreamQuery.Close
  Set m_oStreamQuery = Nothing
  m_oStreamOut.Close
  Set m_oStreamOut = Nothing
  Set m_oCmd = Nothing
  m_oConn.Close
  Set m_oConn = Nothing
```