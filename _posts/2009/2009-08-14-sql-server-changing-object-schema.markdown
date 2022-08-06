---
layout: post
title: SQL Server - Changing Object Schema
date: 2009-08-14 09:55:00
tags: [sqlserver]
published: true
---

I'd forgotten the syntax for moving an object to a different schema:

```sql
alter schema NewSchema transfer OldSchema.ObjectName
```