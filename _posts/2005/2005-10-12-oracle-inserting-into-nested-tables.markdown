---
layout: post
title: Oracle - Inserting into nested tables
date: 2005-10-12 00:00:00
tags: [plsql,oracle]
published: true
---

Oracle supports the concept of a nested table.  You can insert data into a nested table as follows:

```sql
INSERT INTO TABLE(
  SELECT p.nested_table
  FROM primary_table p
  WHERE p.user_id.id = 1)
VALUES ('1', 2, 3)
```
