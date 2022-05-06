---
layout: post
title: ASP - Adding XML nodes to an existing document
date: 2002-11-05 00:00:03
tags: [asp,xml]
published: true
---

If you need to insert nodes into an XML file that already exists, use the Microsoft XMLDOM object to achieve this with ASP.

```vb
'-----------------------------------------------------------------------------------
' Adds nodes to an existing XML document
'-----------------------------------------------------------------------------------
Sub AddNodes
  Dim objXML
  Dim arrFields
  Dim objNewElem
  Dim objRoot
  Dim sql
  Dim strFields
  Dim strFieldName
  ' create the object to manipulate XML file
  Set objXML = Server.CreateObject("Microsoft.XMLDOM")
  ' load the file
  objXML.load(strPath & "" & strFileName)
  ' get the main elements by the tag name
  Set collElements = objXML.getElementsByTagName(strTagName)
  ' create a collection object of all the child nodes in the XML file
  Set collChildren = collElements.item(0).childNodes
  ' add elements to XML file
  For intFieldCounter = 0 To 10
    Set objRoot = objXML.documentElement
    Set objNewElem = objXML.createElement(intFieldCounter)
    ' add the new element to the XML file
    objRoot.childNodes.item(I).appendChild objNewElem
    ' add the field value to the created node as CDATA (so ignores illegal characters)
    objRoot.childNodes.item(I).lastChild.appendChild objXML.createCDATASection("text goes here") 
  Next
  ' save the modified XML file
  objXML.save(strPath & "" & strFileName)
  Set objXML = Nothing
End Sub
```