---
layout: post
title: Rebuilding SQL Server Indexes
date: 2010-11-12 10:03:00
tags: [sqlserver]
published: true
---

I've always used cursors to rebuild indexes in SQL Server, like so:

```sql
USE YourDatabase

DECLARE @tableName varchar(255)
DECLARE cur CURSOR FOR

SELECT table_schema + '.' + table_name 
FROM information_schema.tables
WHERE table_type = 'base table'

OPEN cur

FETCH NEXT FROM cur INTO @tableName
WHILE @@FETCH_STATUS = 0
BEGIN
	DBCC DBREINDEX(@tableName,' ',90)
	FETCH NEXT FROM cur INTO @tableName
END

CLOSE cur
DEALLOCATE cur
```

However, I discovered a much easier way to do it today:

```sql
sp_MSforeachtable @command1="print '?' DBCC DBREINDEX ('?')"
```

This is an undocumented stored procedure that I didn't even know existed until this morning. The cursor route is still useful for when you want to exclude tables, but dang....I wish I'd known of this earlier.