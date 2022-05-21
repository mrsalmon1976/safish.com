---
layout: post
title: SQL Server - Inserting Rows Using INSERT...SELECT
date: 2004-02-13 00:00:00
tags: [sqlserver]
published: true
---

To copy all the data from one table into another:

```sql
INSERT INTO Destination
   SELECT Col1, Col2, Col3
   FROM Source
   WHERE Col1 = 'example'
```

To copy a table and all it's data (not including primary keys, indexes, etc.):

```sql
SELECT * INTO Destination FROM Source
```
