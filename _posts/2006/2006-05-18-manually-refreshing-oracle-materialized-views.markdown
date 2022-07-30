---
layout: post
title: Manually refreshing Oracle materialized views
date: 2006-05-18 00:00:00
tags: [oracle,plsql]
published: true
---

**Manual Refreshes**

You can manually refresh a materialized view with the following statement:

```sql
EXECUTE DBMS_SNAPSHOT.REFRESH('mv_your_view', 'c');
```

where your options are:

 - F, f - fast refresh
 - C, c - complete refresh
 - A - Always perform complete refresh
 - ? - Use the default option