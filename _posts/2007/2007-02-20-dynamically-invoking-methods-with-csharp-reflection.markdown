---
layout: post
title: Dynamically invoking methods with C# reflection
date: 2007-02-20 00:00:00
tags: [c#]
published: true
---

The following code will execute the method "YourMethod" for the class "Fully.Qualified.TypeName", and the result of that method will be stored in object "result".

```csharp
// load the type from the assemblies in memory
Type type = null;
Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

// attempt to load the type
foreach (Assembly assembly in assemblies)
{
  type = assembly.GetType("Fully.Qualified.TypeName");
  if (type != null) break;
}

if (type == null) 
  throw new ApplicationException("Unable to dynamically load type");
          
object dynamicObject = Activator.CreateInstance(type);
if (dynamicObject == null) 
  throw new ApplicationException("Unable to dynamically create instance of " + type.FullName);

object[] arguments = new object[] { "arg1", "arg2" };

object result = type.InvokeMember("YourMethod",
  BindingFlags.Default | BindingFlags.InvokeMethod,
  null,
  dynamicObject,
  arguments
  );
```

