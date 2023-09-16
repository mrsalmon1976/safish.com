---
layout: post
title: Sql Server - Stubborn single user mode
date: 2023-09-16 06:48:00
tags: [sqlserver]
published: true
---

Once a database has been moved into SINGLE USER mode, it can be tricky to get it out of that mode.  Usually, you will need to run

```sql
sp_who2
```

Scroll down the result set and find a session using the DBName for the database that is locked out, and kill that session.

Sometimes, however, for a reason unknown to me, the SPID hasn't appeared using `sp_who` or `sp_who2`.  In this case, use

```sql
SELECT request_session_id FROM sys.dm_tran_locks 
WHERE resource_database_id = DB_ID('YourDatabaseName')
```

Once you have located the session, as before, just kill it

```sql
kill YOURSESSIONID
```

You should then be able to set the DB back to MULTI USER mode:

```sql
ALTER DATABASE YourDatabase SET MULTI_USER
```