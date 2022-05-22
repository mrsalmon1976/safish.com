---
layout: post
title: SQL Server - Retrieving Database and Table Sizes
date: 2004-08-23 00:00:00
tags: [sqlserver]
published: true
---

*Log file sizes*

```sql
select size as 'pages', size*8000 as 'size', name from sysfiles
```

*For the whole database*

```sql
sp_spaceused @updateusage = 'TRUE'
```

*For a specific table*

```sql
sp_spaceused @objname = '<table_name>'
```
