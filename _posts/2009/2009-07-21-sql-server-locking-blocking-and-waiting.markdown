---
layout: post
title: SQL Server Locking, Blocking and Waiting
date: 2009-07-21 10:08:00
tags: [sqlserver]
published: true
---

Being able to see what is blocking or waiting on a SQL Server machine is essential for most developers these 
days. I find myself using the following queries almost daily at the moment, so I thought I'd post them here:

**Waiting**

```sql
select 
    tx.[text] as ExecutingSQL, 
    wt.session_id, 
    wt.wait_duration_ms, 
    wt.wait_type, 
    wt.resource_address, 
    wt.blocking_session_id, 
    wt.resource_description
from sys.dm_os_waiting_tasks wt
inner join sys.dm_exec_connections ec on wt.session_id = ec.session_id
cross apply 
(
    select * from sys.dm_exec_sql_text(ec.most_recent_sql_handle)
) as tx
where wt.session_id > 50 and wt.wait_duration_ms > 0
```

**Blocking**

```sql
select 
    Blocked.session_id as Blocked_Session_ID
    ,Blocked_SQL.text as Blocked_SQL
    ,waits.wait_type as Blocked_Resource
    ,Blocking.session_id as Blocking_Session_ID
    ,Blocking_SQL.text as Blocking_SQL
from sys.dm_exec_connections as Blocking
inner join sys.dm_exec_requests as Blocked on Blocked.blocking_session_id = Blocking.session_id
cross apply
(
    select * from sys.dm_exec_sql_text(Blocking.most_recent_sql_handle)
) AS Blocking_SQL
cross apply
(
    select * from sys.dm_exec_sql_text(Blocked.sql_handle)
) as Blocked_SQL
inner join sys.dm_os_waiting_tasks as waits on waits.session_id = Blocked.session_id
```