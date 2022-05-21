---
layout: post
title: Running command-line queries on a PostgreSQL database
date: 2003-04-08 00:00:05
tags: [postgresql]
published: true
---

To run command-line queries on a PostgreSQL database running on Linux, you need to locate the psql executable, connect to the database and run queries manually:

```shell
locate psql
(e.g. returns /usr/bin/psql)
/usr/bin/psql <database_name>
SELECT * FROM <table> LIMIT 200;
q (to quit)
```
