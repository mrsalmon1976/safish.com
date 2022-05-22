---
layout: post
title: SQL Server Table and Index Sizes
date: 2004-05-06 00:00:00
tags: [sqlserver]
published: true
---

Use the following undocumented stored procedure to determine the number of rows in a table, and the amount of space used by the tables data and indexes:

```sql
sp_MStablespace 'object'
```