---
layout: post
title: SQL Server - Changing Object Ownership
date: 2003-10-16 00:00:00
tags: [sqlserver,t-sql]
published: true
---

For example, to change the owner of table MyTable to user MyUser, just run the predefined stored procedure sp_changeobjectowner:

```sql
  EXEC sp_changeobjectowner 'MyTable', 'MyUser'
```