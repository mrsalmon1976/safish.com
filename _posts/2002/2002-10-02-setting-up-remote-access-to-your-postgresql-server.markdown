---
layout: post
title: Setting up remote access to your PostgreSQL server
date: 2002-10-02 00:00:00
tags: [postgresql]
published: true
---

Controlling access to your Postgres databases on a network is done by editing the file pg_hba.conf, usually 
located in /usr/local/pgsql/data/ An example follows, where md5 is the recommended authorisation type as 
passwords are encrypted before being sent over the network. You will need to edit the passwords of the 
Postgres users that can connect in the pg_shadow table of the template1 database.

```
# TYPE     DATABASE    IP_ADDRESS    MASK               AUTH_TYPE  AUTH_ARGUMENT
local      all                                          trust
host       all         127.0.0.1     255.255.255.255    trust
host       all         123.2.234.0   255.255.255.0      password
host       all         123.2.235.0   255.255.255.0      md5
```