---
layout: post
title: SQL Server - Updating varbinary fields
date: 2010-01-29 15:52:00
tags: [sqlserver]
published: true
---

I'm working on a development database with a lot of varbinary fields - these are great once 
you have your admin screens but they're a pain in the initial development phase when there 
is no GUI for loading data. This little T-SQL snippet can be used to update varbinary fields 
- or adapt it to insert new data into varbinary fields.

```sql
update [schema].[table] set Column = (
 SELECT * 
        FROM OPENROWSET(BULK N'E:\Share\Temp\myfile.jpg', SINGLE_BLOB) AS BinaryFile
)
```