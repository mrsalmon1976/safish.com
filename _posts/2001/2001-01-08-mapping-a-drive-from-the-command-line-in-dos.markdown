---
layout: post
title: Mapping a drive from the command line in DOS
date: 2001-01-08 00:00:12
tags: [dos]
published: true
---

Syntax: 

```batchfile
net use * <ipaddress>\<drive>$ /USER:<username>
```

Example:

```batchfile
E.g.: net use * 10.83.106.157\c$ /USER:msalmon
```
