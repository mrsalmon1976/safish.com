---
layout: post
title: Manually creating default constraints in SQL Server
date: 2012-03-01 15:24:00
tags: [sqlserver]
published: true
---

Default constraints can be added in Management Studio by setting a default value for a field in the designer, or by specifying it in your table create script. This SUCKS though, because it generates a random name for the constraint, which can lead to inconsistencies across databases - if you ever need to drop the constraint you can't guarantee will work everywhere (assuming you have multiple development, staging, UAT instances).

The better approach is to create your defaults manually once the table already exists - this allows you to specify a name:

```sql
ALTER TABLE dbo.MyTable ADD CONSTRAINT
   DF_MyDefault DEFAULT 1 FOR MyColumn
GO
```