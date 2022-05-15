---
layout: post
title: VB6 - Associating file extensions with your app
date: 2003-04-08 00:00:01
tags: [visualbasic]
published: true
---

To associate a custom file extension with your app using Visual Basic 6:

```vb
  string keyName = "MyApp";
  string keyValue = "My Application";
  RegistryKey key = null;

  key = Registry.ClassesRoot.CreateSubKey(keyName);
  key.SetValue("",keyValue);
  key = key.CreateSubKey("shell");
  key = key.CreateSubKey("open");
  key = key.CreateSubKey("command");
  key.SetValue("","c:tempmy.exe %1");
            
  keyName = ".bar";	// file association you want
  keyValue = "MyApp";	// must correspond to above!!
  key = Registry.ClassesRoot.CreateSubKey(keyName);
  key.SetValue("", keyValue);
```