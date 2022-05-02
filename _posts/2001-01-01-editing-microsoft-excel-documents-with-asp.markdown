---
layout: post
title: Editing Microsoft Excel Documents with ASP
date: 2001-01-08 00:00:00
cover-img: ../assets/img/path.jpg
thumbnail-img: /assets/img/thumb.png
share-img: ../assets/img/path.jpg
tags: [asp]
---

If you have Microsoft Excel installed on your web server, you can edit or create documents using ASP.


```vb
  Dim objApp, objWorkBook, objASheet

  ' create instance of Excel, Workbook and finally active sheet
  Set objApp = CreateObject("Excel.Application")
  Set objWorkBook = objApp.WorkBooks.Add
  Set objASheet = objApp.ActiveWorkBook.ActiveSheet

  ' set sheet name
  objASheet.Name = "Address Book"
  
  ' set title fields
  objASheet.Cells(1,1).Value = "Name"
  objASheet.Cells(1,1).Font.Bold = True
  objASheet.Cells(1,2).Value = "Telephone"
  objASheet.Cells(1,2).Font.Bold = True

  ' set info fields
  objASheet.Cells(3,1).Value = "John Thomas"
  objASheet.Cells(3,2).Value = "3121878"
  objASheet.Cells(4,1).Value = "Jane Thomas"
  objASheet.Cells(4,2).Value = "2662687"

  ' save sheet to whereever
  objASheet.SaveAs Server.MapPath(".") & "TEST.XLS"
	
  ' quit the application - very important to prevent multiple instances of Excel
  ' running on the server - use On Error Resume Next to ensure this line gets 
  ' executed
  objASheet.Application.Quit

  ' clean up
  Set objASheet = Nothing
  Set objWorkBook = Nothing
  Set objApp = Nothing
```

