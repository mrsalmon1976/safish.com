---
layout: post
title: SQL Server : Invoking COM Components
date: 2004-02-16 00:00:00
tags: [sqlserver]
published: true
---

You can create and use COM components with the sp_O stored procedures.

```sql
sp_OACreate "MyComponent.Class"
```

would be used to create an instance of your component - you can then use the other stored procedures to fire methods, set properties, etc.