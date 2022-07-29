---
layout: post
title: T-SQL Tips - Formatting Numbers
date: 2005-02-23 00:00:00
tags: [sql]
published: true
---

Adding thousand-separator commas to numbers:

```sql
SELECT CAST(CONVERT(varchar, CAST(123456 AS money), 1) AS varchar)
```

Limiting decimal points:

```sql
SELECT CAST(100000.456789 AS decimal(12,2))
```
