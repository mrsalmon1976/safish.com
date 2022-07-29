---
layout: post
title: Sending arrays to Oracle stored procedures with .NET
date: 2005-11-02 00:00:00
tags: [oracle,c#]
published: true
---

You can send arrays to Oracle stored procedures as parameters.

Add an OracleParameter object, setting it's type to the underlying type of the array, e.g.

```csharp
OracleDbType.Int32
```

After that, set the CollectionType property of the OracleParameter as follows:

```csharp
yourParm.CollectionType = OracleCollectionType.PLSQLAssociativeArray;
```