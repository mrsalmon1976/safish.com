---
layout: post
title: SQL Server - Finding tables by column
date: 2009-09-10 14:36:00
tags: [sqlserver]
published: true
---

Assuming you use a decent naming convention in your database, it's sometimes useful to be able to find a list 
of tables with a common column - for example if you want to write a script to clean out all data related to a 
specific item, referenced by foreign key columns of the same or a similar name.

```sql
SELECT distinct
    c.table_name,
    c.table_schema,
    c.column_name
  FROM 
    information_schema.columns c
    INNER JOIN information_schema.tables t 
      ON c.table_name = t.table_name 
  WHERE
    c.column_name LIKE '%my_column_name%'
    AND t.table_type = 'BASE TABLE'
  ORDER BY 
    c.table_name,
    c.column_name
```