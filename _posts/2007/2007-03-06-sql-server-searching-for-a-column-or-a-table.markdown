---
layout: post
title: SQL Server - Searching for a column or table
date: 2007-03-06 00:00:00
tags: [c#]
published: true
---

This query will return all tables with and columns that match 'test' in any way. If you want to search against 
views too, just remove the "t.table_type" restriction:

```sql
SELECT
  c.table_name,
  c.column_name,
  c.data_type,
  c.character_maximum_length,
  c.numeric_precision,
  c.numeric_scale
FROM	
  information_schema.columns c
  INNER JOIN information_schema.tables t 
    ON c.table_name = t.table_name 
WHERE
  c.table_name LIKE '%test%'
  OR c.column_name LIKE '%test%'
  AND t.table_type = 'BASE TABLE'
ORDER BY 
  c.table_name,
  c.column_name
```

If you want to search for a list of columns of a particular length, you could use the following query:

```sql
SELECT 
  table_name, 
  column_name, 
  character_maximum_length 
FROM 
  information_schema.Columns C 
WHERE 
  data_type = 'varchar' 
  AND table_schema = 'dbo' 
  AND character_maximum_length < 20 
  AND character_maximum_length > -1 
ORDER BY
  table_name desc
```