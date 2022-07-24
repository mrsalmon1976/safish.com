---
layout: post
title: MySQL - Adding Users
date: 2004-10-12 00:00:00
tags: [mysql]
published: true
---

Log in to mysql:

```sql
mysql --user=root <database>
```

Grant all privileges on the local machine:

```sql
GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;
```

Grant all privileges from other machines:

```sql
GRANT ALL PRIVILEGES ON *.* TO 'user'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
```