---
layout: post
title: Retrieving database information in Oracle
date: 2006-04-12 00:00:00
tags: [oracle,plsql]
published: true
---

Here are some useful queries when you're looking at an Oracle database:

**Getting Table Information**

```sql
SELECT table_name, owner, tablespace_name FROM all_tables
```

**Getting Column Information**

```sql
SELECT column_name, table_name, data_type, data_length FROM user_tab_columns
```
