---
layout: post
title: SQL Server Cursors
date: 2003-10-28 00:00:00
tags: [sqlserver,t-sql]
published: true
---

You can use cursors in SQL Server stored procedures to process data already in the database and take action accordingly. These can be used just like recordsets within standard code - for example:

```sql
  CREATE PROCEDURE MyStoredProc
  AS
  DECLARE @ID int
  DECLARE @Desc varchar(100)
  DECLARE MyCursor CURSOR FOR 
    SELECT TOP 10 ID, Desc FROM MyTable

  OPEN MyCursor
  FETCH NEXT FROM MyCursor INTO @ID, @Desc

  WHILE @@FETCH_STATUS = 0
  BEGIN
    PRINT CAST(@ID as varchar(10)) + '--' + @Desc
    FETCH NEXT FROM MyCursor INTO @ID, @Desc
  END

  CLOSE MyCursor
  DEALLOCATE MyCursor
```