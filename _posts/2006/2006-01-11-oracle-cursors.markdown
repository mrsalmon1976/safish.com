---
layout: post
title: Oracle Cursors
date: 2006-01-11 00:00:00
tags: [oracle,plsql]
published: true
---

A proc containing a cursor can be written as follows:

```shell
PROCEDURE my_proc IS
  CURSOR mytable_cur IS
    SELECT id
    FROM   mytable
    WHERE  status = 1;

BEGIN

  FOR mytable_rec IN mytable_cur LOOP
    -- do whatever
  END LOOP;

END my_proc;
```