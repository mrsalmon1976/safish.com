---
layout: post
title: C# - Opening external applications
date: 2001-08-22 00:00:00
tags: [c#]
published: true
---

Opening files from within your application that you do not want to handle within the application itself is really simple using the System.Diagnostics namespace.

**Eg: to open the user's default browser to a web site:**
  
```csharp
  try 
  {
    System.Diagnostics.Process.Start("http://yoursite.com");
  }
  catch (Exception) 
  {
    // error handling
  }
```

**Eg: To open the user's mail client to send mail to someone:**

```csharp
  try 
  {
    System.Diagnostics.Process.Start("mailto: someone@somewhere.com");
  }
  catch (Exception) 
  {
    // error handling
  }
```

**Eg: To open a gif file:**

```csharp
  try 
  {
    System.Diagnostics.Process.Start("C:/YourFile.gif");
  }
  catch (Exception) 
  {
    // error handling
  }
```
