---
layout: post
title: Viewing the currently executing SQL in Oracle
date: 2006-12-11 00:00:00
tags: [oracle,plsql]
published: true
---

Sometimes if you are having a performance problem you might want to know what SQL statements are being run - you 
can trawl through these to work out what is causing the problem. The v$sql table can be used to view all queries that are being run.

```sql
SELECT   
    module, last_load_time, 
    last_active_time, sql_text
FROM  v$sql 
WHERE UPPER(sql_text) LIKE '%SELECT%'  
AND   module = 'aspnet_wp.exe'
AND   UPPER(sql_text) NOT LIKE '%FROM V$SQL%'
ORDER BY last_load_time DESC, module
```
