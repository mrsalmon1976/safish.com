---
layout: post
title: SQL Server - Finding and Killing Database Connections
date: 2009-08-13 07:39:00
tags: [sqlserver]
published: true
---

This is a query I use often to check what active connections exist for a specified database:

```sql
select  spid, sp.cmd, sp.hostname, sp.loginame, sp.nt_domain, sp.nt_username, sp.program_name
from    master.dbo.sysprocesses sp
where   db_name(dbid) = 'mydatabase'
and DBID <> 0  
and spid <> @@spid 
```

If I want to take the database offline I'll then kill these processes using the spid.

I also found a great post today that had a nice way of killing ALL active connections, by running the following sql:

```sql
alter database dbName set single_user with rollback immediate  
```

This can then be reverted out with

```sql
alter database dbName set multi_user with rollback immediate 
```