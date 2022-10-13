---
layout: post
title: MariaDB - Backing up and restoring over an existing database
date: 2022-10-13 13:59:00
tags: [mariadb]
published: true
---
MariaDB backup and restore is really simple from the command line.  If you have a problem with a 
database caused by a change (see: Wordpress), and want to restore to a previous version, you need 
a mysql dump file, and that's it.  All you need to do is run the command and it will drop/recreate 
all tables with data.  This can be done in a single statement (NOTE: no spaces after -u and -p).

```batch
mysql -uusername -ppassword wordpress_databasename < E:\mybackup.sql
```

This, of course, assumes you had a dump file.  These can be created as a scheduled task with the 
following command:

```batch
mysqldump -uusername -ppassword wordpress_databasename > E:\mybackup.sql
```

