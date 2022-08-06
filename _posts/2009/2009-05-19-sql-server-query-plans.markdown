---
layout: post
title: SQL Server Query Plans
date: 2009-05-19 11:01:00
tags: [sqlserver]
published: true
---

The caching of query plans in SQL Server is extremely important when it comes to application performance. The 
way this works is not very well understood - I still don't get all the intricacies of it but as a general rule 
of thumb, it's a good move to either:

1. Use stored procedures: these get pre-compiled and allow the re-use of execution plans. They allow for parameters, allowing for a "shared" execution plan
2. If the use of stored procs is not possible or not part of your design, use sp_executesql - do NOT use EXEC when running dynamic sql. sp_executesql, unlike EXEC, can be parameterised and therefore also allows for "shared" execution plans.

You can analyse the cached execution plans on SQL Server with the following statement:

```sql
with CachedPlans as (
select top 100
    objtype,
    p.size_in_bytes,
    left([sql].[text], 100) as [text],
    usecounts
from sys.dm_exec_cached_plans p
outer apply sys.dm_exec_sql_text (p.plan_handle) sql
)
select * from CachedPlans
where text like '%Select * from MyTable%'
order by usecounts desc
```