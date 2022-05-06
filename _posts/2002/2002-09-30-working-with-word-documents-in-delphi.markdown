---
layout: post
title: Delphi - Working with word documents
date: 2002-09-30 00:00:00
tags: [delphi,word,office]
published: true
---


The following shows how to programmatically open, modify, save and close a word document.

```delphi
var
  oWordApp: Variant;
  oBookmark: Variant;
  oRange: Variant;
begin
  try
    oWordApp := CreateOleObject('Word.Application');
  except on E: Exception do
    begin
    ShowMessage('Word does not appear to be installed: ' + E.Message);
    Exit;
    end;
  end;
  // open the document and manipulate text
  try
    begin
    oWordApp.Visible := False;
    oWordApp.Documents.Open(FileName);
    oBookmark := WordApp.ActiveDocument.Bookmarks.Item('NamedBookark');
    oRange := oBookMark.Range;
    oRange.Select;
    oRange.Text := 'New text that you have written!';
    oRange := Unassigned;
    oBookmark := Unassigned;
    oWordApp.ActiveDocument.Save;
    end;
  except on E: Exception do
    begin
    ShowMessage('Unable to generate report: ' + E.Message);
    end;
  end;
  // close word and clean up
  oWordApp.Quit;
  oWordApp := Unassigned;
end;
```