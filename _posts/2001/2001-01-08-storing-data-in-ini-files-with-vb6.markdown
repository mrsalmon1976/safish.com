---
layout: post
title: Storing data in INI files with VB6
date: 2001-01-08 00:00:09
tags: [vb,visualbasic]
published: true
---

Although most settings can be stored in the registry these days, it is sometimes more practical to store settings in an INI file (e.g. you want to be able to manually go and change those settings regularly).

There are predefined functions in the Windows API to allow you to read and write properties to/from INI files:

```vb
  ' to write values to an INI file.
  Declare Function WritePrivateProfileString _
    Lib "kernel32" Alias "WritePrivateProfileStringA" _
    (ByVal lpApplicationname As String, ByVal _
    lpKeyName As Any, ByVal lsString As Any, _
    ByVal lplFilename As String) As Long
  
  ' to read values from an INI file
  Declare Function GetPrivateProfileString Lib _
    "kernel32" Alias "GetPrivateProfileStringA" _
    (ByVal lpApplicationname As String, ByVal _
    lpKeyName As String, ByVal lpDefault As _
    String, ByVal lpReturnedString As String, _
    ByVal nSize As Long, ByVal lpFileName As _
    String) As Long
```

For example, if you have the following INI file:

```ini
  [MyHeading]
  MyKey1=myValue1
  Dir=c:mydir
  File=hello.txt
```

You could read the value of the "File" key in the following way:

```vb
  Dim lngResult As Long
  Dim strFileName
  Dim strResult As String * 50
  strFileName = "C:MyIniFile.ini"
	
  lngResult = GetPrivateProfileString("MyHeading", _
    "File", strFileName, strResult, Len(strResult), _
    strFileName)

  If lngResult = 0 Then
    'An error has occurred
    Call MsgBox("An error has occurred", vbExclamation)
    Exit Sub
  Else
    MsgBox "The value is " & strResult
  End If
```

You could change the value of the same key in the following way:

```vb
  Dim lngResult As Long
  Dim strFileName
  strFileName = "C:MyIniFile.ini"
  lngResult = WritePrivateProfileString("MyHeading", "File", "NewValue", strFileName)

  If lngResult = 0 Then
    'An error has occurred
    Call MsgBox("An error has occurred", vbExclamation)
  Else
    MsgBox "The value has been changed"
  End If
```
  
**Using the return value**

The return value (in the example lngResult) specifies the length of the string that is being returned. A value of 0 means an error occurred, but if you want to use the string that is returned you need to do some work due to the fact that the string is the length specified (in the example 50). For example if you want to tell the user what was returned, you would code:

```vb
  MsgBox Left(strResult, lngResult) & " is the result."
```

which would effectively get the exact value returned rather than the padded version.