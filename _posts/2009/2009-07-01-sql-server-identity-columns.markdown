---
layout: post
title: SQL Server IDENTITY Columns
date: 2009-07-01 16:52:00
tags: [sqlserver]
published: true
---

IDENTITY columns can be a real pain in the ass when data gets out of sync. GUIDs are generally a much better 
option when it comes to replication, but you aren't always in control of data structures and sometimes you 
inherit old systems that weren't designed to be replicated.

That being said, here are some tips on how to get around problems with IDENTITY columns and getting data in sync:

**IDENTITY_INSERT**

You can temporarily turn identity insertion off with the following statement:

```sql
SET IDENTITY_insert <table> ON
```

You can now insert the identity values into your table. Don't forget to run the same statement on the table, substituting ON for OFF!

**Reseeding the IDENTITY value**

For example, if you want to reset the current identity value on a table to 100, you can use the following statement:

```sql
DBCC CHECKIDENT
(
 'schema.table', RESEED, 100
)
```