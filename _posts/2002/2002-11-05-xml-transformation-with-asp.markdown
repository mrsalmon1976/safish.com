---
layout: post
title: XML Transformation with ASP
date: 2002-11-05 00:00:02
tags: [asp]
published: true
---

Transform XML using a stylesheet in ASP

```vb
  Dim objStyleFile
  Dim objFS
  Dim objXML
  Dim objXSL
  Dim strXSL
  Set objXML = Server.CreateObject("Microsoft.XMLDOM")
  ' load XML file into XML parser
  objXML.load Server.MapPath("/RBK/XML/Product.xml")
  ' open the xsl/stylesheet file and store as a string
  Set objFS = CreateObject("Scripting.FileSystemObject")
  Set objStyleFile = objFS.OpenTextFile(Server.MapPath("/RBK/XML/Product.xsl"))
  strXSL = objStyleFile.ReadAll 
  objStyleFile.Close
  Set objStyleFile = Nothing
  Set objFS = Nothing
  'Load the stylesheet to an xml document object
  Set objXSL = Server.CreateObject("Microsoft.XMLDOM")
  ' replace any fields you want to in the XSL file
  strXSL = Replace(strXSL, "", intProductID)
  ' objXSL.async = false
  objXSL.loadXML(strXSL)
  	          
  If objXML.parseError = 0 AND objXSL.parseError = 0 Then
    strProductInfo = objXML.transformNode(objXSL)
    Response.Write strProductInfo
  Else
    Call DisplayError("There has been a problem retrieving the product information")
  End If
  ' clean up objects
  Set objXML = Nothing
  Set objXSL = Nothing
```