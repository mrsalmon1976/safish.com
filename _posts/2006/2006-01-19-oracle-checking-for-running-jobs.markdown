---
layout: post
title: Oracle - Checking for running jobs
date: 2006-01-19 00:00:00
tags: [oracle,plsql]
published: true
---

You can see if a job is running in Oracle by checking against the user_jobs table for the exact name of what you are running, for example:

```shell
SELECT COUNT(uj.job)
INTO   v_running
FROM   user_jobs uj
WHERE  uj.what = 'myschema.mypackage.myproc;';
```