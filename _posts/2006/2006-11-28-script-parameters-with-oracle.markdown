---
layout: post
title: Script parameters with Oracle
date: 2006-11-28 00:00:00
tags: [oracle,plsql]
published: true
---

Sometimes you need to pass parameters into your database scripts for variable object names. For example, if your tablespace names are different on live to development, you could do the following for your installation scripts:

```sql
PROMPT Tablespace name for DATA e.g.TSDATA
ACCEPT TABLESPACE_DATA PROMPT 'Tablespace Name :'
 
PROMPT Tablespace name for INDEXES e.g. TSINDEX
ACCEPT TABLESPACE_INDEX PROMPT 'Tablespace Name :'
 
PROMPT ***********************************
PROMPT * Tablespace Names
PROMPT * Data : &&TABLESPACE_DATA
PROMPT * Index: &&TABLESPACE_INDEX
PROMPT ***********************************
PAUSE If OK Press RETURN to continue. Otherwise Control-C

...
```