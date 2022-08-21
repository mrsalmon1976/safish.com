---
layout: post
title: Dynamic WHERE and ORDER BY Clauses in SQL Server
date: 2004-09-24 00:00:00
tags: [sql,sqlserver]
published: true
---

You can make your where and ORDER BY clauses dynamic using a CASE statement;

```sql
SELECT *
    FROM MyTable
WHERE
    Col1 LIKE 
      CASE Col2
        WHEN '1' THEN 'X'
        WHEN '2' then 'Y'
        ELSE 'Z'
      END 
```

```sql	  
CREATE PROCEDURE GetEmployees ( 
    @ColName varchar(100) 
  ) 
  AS
    SELECT Col1, Col2
    FROM Employees
    ORDER BY
      CASE 
        WHEN @ColName='X' THEN CONVERT(char(50), Col1) + CONVERT(char(50), Col2)
        WHEN @ColName='Y' THEN CONVERT(varchar(50), Col1)
        WHEN @ColName='Z' THEN Z
      END
```