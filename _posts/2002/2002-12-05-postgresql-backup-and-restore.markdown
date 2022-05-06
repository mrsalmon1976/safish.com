---
layout: post
title: PostgreSQL Backup and Restore
date: 2002-12-05 00:00:00
tags: [postgresql]
published: true
---

## Backing Up

Locate the pg_dump file (usually located in /usr/local/pgsql/bin/ and run the following commands to backup your database:

```
pg_dump -s -f filename_schema.dmp -U username database_name
pg_dump -a -f filename_data.dmp -U username database_nameto create the schema and data dumps respectively. This will create text files with all the necessary SQL statements required to restore the database using the PostgreSQL restore feature.
```

## Dropping the existing database

Before restoring, you may need to drop the existing database. Use the following command:

```
dropdb <database_name>
```

## Restoring the database

To restore the above database, you will need to create a new database and then run the script using the psql command:

```
createdb --username=<user> database_name
psql -e -f filename_schema.dmp -U <user> <database_name>
psql -e -f filename_data.dmp -U <user> <database_name>to restore the schema, and then the data.
```
