---
layout: post
title: SQL Server - Currently Executing Queries
date: 2009-08-21 10:58:00
tags: [sqlserver]
published: true
---

I found this [great article by Ian Stirk](http://www.sqlservercentral.com/articles/DMV/64425/) on [SQLServerCentral.com](http://www.sqlservercentral.com/), regarding finding queries that are 
currently executing on SQL Server. The article contains the following VERY useful query:

```sql
-- Do not lock anything, and do not get held up by any locks.
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

-- What SQL Statements Are Currently Running?
SELECT [Spid] = session_Id
 , ecid
 , [Database] = DB_NAME(sp.dbid)
 , [User] = nt_username
 , [Status] = er.status
 , [Wait] = wait_type
 , [Individual Query] = SUBSTRING (qt.text, 
             er.statement_start_offset/2,
 (CASE WHEN er.statement_end_offset = -1
        THEN LEN(CONVERT(NVARCHAR(MAX), qt.text)) * 2
  ELSE er.statement_end_offset END - er.statement_start_offset)/2)
 ,[Parent Query] = qt.text
 , Program = program_name
 , Hostname
 , nt_domain
 , start_time
    FROM sys.dm_exec_requests er
    INNER JOIN sys.sysprocesses sp ON er.session_id = sp.spid
    CROSS APPLY sys.dm_exec_sql_text(er.sql_handle)as qt
    WHERE session_Id > 50              -- Ignore system spids.
    AND session_Id NOT IN (@@SPID)     -- Ignore this current statement.
    ORDER BY 1, 2
```