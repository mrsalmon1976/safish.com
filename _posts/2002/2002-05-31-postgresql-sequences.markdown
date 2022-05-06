---
layout: post
title: PostgreSQL Sequences
date: 2002-05-31 00:00:00
tags: [postgresql]
published: true
---

Sequence objects (also called sequence generators or just sequences) are special single-row tables created with CREATE SEQUENCE. Sequential fields in tables are linked to sequence objects, so you can insert integers into these fields manually, or leave it up to the sequence object to create the next integer for you.

This is useful when you want the sequential number for further processing - you can manually retrieve the next number in the sequence using

```sql
SELECT nextval('sequence_name');
```

which returns a single-row recordset with one field called "nextval". To insert your new record into the table with the sequential field, just manually insert this value instead of omitting the normally self-incrementing field.