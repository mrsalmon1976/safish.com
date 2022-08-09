---
layout: post
title: Restoring a SQL Server database from the command line
date: 2012-02-08 01:19:00
tags: [sqlserver]
published: true
---

I'm perpetually restoring databases, and doing it via the GUI using SQL Server Management Studio is tedious. Instead, I like to use a script to restore my database. This involves the creation of a .bat file and an accompanying .sql file, as follows:

**The batch file (e.g. restore.bat)**

There are three things to note here that you may need to change:

1. The SQL Server instance
2. The database name - in my example 'MyDatabase'
3. The name of the accompanying .sql file (in my example called restore.sql). This assumes the .bat and .sql files are in the same database

```batch
sqlcmd -S localhost\SQL2008r2 -i restore.sql -v database=MyDatabase -v root="%CD%"
PAUSE
```

**The sql file (e.g. restore.sql)**

There are a few things to note here:

1. The name of the backup file, in my example MyDatabase.bak - the script assumes this is also in the same folder
2. The names of the files associated with your database. These may differ on the machine where the database was backed up, to the machine where you are restoring the database to. You can get these names from the original database in Management Studio by right-clicking the database and viewing properties, click Files, and checking the Logical Name column. If you don't know these, just put any old value in and you will receive an error when running the script that should show the correct name. In my example the data file is MyDataFile, and the log file is MyLogFile_log
3. The user you want to grant db_owner access to. This user must exist as a login on the database instance. In my example, it is called 'myuser'. You may want to change the roles assigned to the user, I am just assigning the db_owner role.

```sql
USE MASTER
GO

DROP DATABASE $(database)
GO

RESTORE DATABASE $(database) FROM DISK = '$(root)\MyDatabase.bak'
WITH MOVE 'MyDataFile' TO 'c:\temp\MyDatabase.mdf',
MOVE 'MyLogFile_log' TO 'c:\temp\MyDatabase.ldf'
GO

USE $(database)
GO

sp_grantdbaccess 'myuser'
GO

sp_addrolemember 'db_owner', 'myuser'
GO
```