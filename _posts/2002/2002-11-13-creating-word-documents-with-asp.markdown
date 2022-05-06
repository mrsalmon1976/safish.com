---
layout: post
title: Creating Word Documents with ASP
date: 2002-11-13 00:00:00
tags: [asp,word]
published: true
---

Using this code you can create a word document which you can then allow your users to download. All you need is to have Word installed on your web server, and to 
have a template file (whatever.dot) available to the application to open up.

```vb
  ' dim variables
  Dim wObject, wDocument

  ' create word document object
  Set wObject = CreateObject("Word.Application")
  ' Set temp word file
  Set wDocument = wObject.Documents.Add(Server.MapPath(".") & "Template.dot")

  ' choose the font that you want for your document (will default to Times New 
  ' Roman if you leave this out)
  wObject.Selection.Font.Name = "Verdana"
  ' write text to the page
  wObject.Selection.TypeText("Plain verdana")
  ' new paragraph
  wObject.Selection.TypeParagraph
  ' insert page break 
  wObject.Selection.InsertBreak
  ' add picture to document
  wObject.Selection.InlineShapes.AddPicture Server.MapPath(".") & "" & "picName.gif"
  ' change the size of the font
  wObject.Selection.Font.Size = 10
  ' change the colour and style of the font
  wObject.Selection.Font.ColorIndex = 2
  wObject.Selection.Font.Bold = True
  wObject.Selection.Font.Italic = False
  ' justify the new parapgraph in the word document (0=left, 1=center, 2=right)
  wObject.Selection.ParagraphFormat.Alignment = 1

  ' save document
  wDocument.SaveAs Server.MapPath(".") & "Output.doc"

  ' quit the word application - very important to prevent multiple 
  ' instances of Word running on the server.  Best approach is to 
  ' have an On Error Resume Next on this page so this line is always 
  ' executed - rather manually trap errors.
  wObject.Application.Quit

  ' clean up
  rs.Close
  Set rs = Nothing
  Set wObject = Nothing
  Set wDocument = Nothing
```