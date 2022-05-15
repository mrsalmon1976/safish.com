---
layout: post
title: Truncating SQL Server Log Files
date: 2003-11-12 00:00:00
tags: [sqlserver]
published: true
---

You can get the name of the log file for your database by looking in the sysfiles table.

```sql
  BACKUP LOG database WITH TRUNCATE_ONLY
  DBCC SHRINKFILE ('logfile', 100, TRUNCATEONLY)
```