---
layout: post
title: SQL - UPDATE Subqueries
date: 2004-10-11 00:00:00
tags: [sql]
published: true
---

**Example:**

Copying the value of 1 field of a record in a table, to the same field of another record in the same table:

```sql
UPDATE MyTable 
SET Col1 = (SELECT Col1 FROM MyTable WHERE PK_Col = 8)
WHERE PK_Col = 9
```

**Example:**

Copying multiple fields and multiple records from one table to another:

```sql
  UPDATE Table1 SET 
    Col1 = t2.Col1, 
    Col2 = t2.Col2
  FROM Table2 t2
  INNER JOIN Table1 t1
  ON 
```