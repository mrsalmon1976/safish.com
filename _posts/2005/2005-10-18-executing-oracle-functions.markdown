---
layout: post
title: Executing oracle functions
date: 2005-10-18 00:00:01
tags: [oracle,plsql]
published: true
---

To execute a function with 2 varchar parameters:

```sql
  exec dp_package.get_number('ME', 'YOU');
```

If the function returns a value you need to declare a vriable to store the value before executing. For example, a function that returns a number can be executed with the following commands:

```sql
var x NUMBER;
EXEC :x:=dp_package.get_number('ME', 'YOU');
PRINT x;
```