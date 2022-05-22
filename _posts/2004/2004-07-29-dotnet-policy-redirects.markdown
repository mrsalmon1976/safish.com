---
layout: post
title: .NET Policy redirects
date: 2004-07-29 00:00:00
tags: [.net]
published: true
---

Sometimes you may want calls to an older version of a component in the GAC to be diverted to a newer version of the component.

In order to do this, you need to create a policy redirect file and drop this into the GAC. The following must be done (the example is for an assembly named My.Assembly:

**1. Create an XML file containing redirect information**

```xml
  <?xml version="1.0" encoding="utf-8" ?>
  <configuration>
    <runtime>
      <assemblyBinding xmlns="urn:schemas-microsoft-com:asm.v1">
        <dependentAssembly>
          <assemblyIdentity name="My.Assembly" publicKeyToken="17374ea5a1072ad8" />
          <bindingRedirect oldVersion="1.0.0.2" newVersion="1.0.1.0" />
          <bindingRedirect oldVersion="1.0.1.0" newVersion="1.0.2.0" />
          <bindingRedirect oldVersion="1.0.2.0" newVersion="1.0.3.0" />
        </dependentAssembly>
      </assemblyBinding>
    </runtime>
  </configuration>
```

In this example, the XML file is called "policy.1.0.My.Assembly.xml".

**2. Create the policy redirect DLL**

Use the Assembly Linker tool to create the policy redirect dll:

```batchfile
al /link:policy.1.0.My.Assembly.xml /out:policy.1.0.My.Assembly.dll /keyfile:"C:\DevKeyFiles\sgKey.snk" /version:1.0.2.0
```

**3. Add redirect to the GAC**

Step 2 should have created a dll file which can then be dragged and dropped in the GAC (usually located at _C:\WinNT\assembly_).

