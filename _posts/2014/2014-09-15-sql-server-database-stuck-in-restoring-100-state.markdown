---
layout: post
title: SQL Server Database Stuck in Restoring 100% State
date: 2014-09-15 16:37:00
tags: [sqlserver]
published: true
---

I had an issue today where an empty database backup could not be restored for the love of money. The backup was 4MB, but when I attempted to restore it would create a 76GB log file on the server and then stay perpetually in a 100% "Restoring" state. This is because one of the virtual logs in the log file is still marked as used, and the database is stuck waiting for the log restore to complete.

You have two options here. Firstly, keep backing up the log and shrinking the log until the virtual logs are cleared up:

```sql
BACKUP LOG [database] TO DISK = 'C:\Temp2.bak'
GO
DBCC SHRINKFILE (N'logfilename' , 10)
GO
```

Your second option is to reset the recovery mode to simple, shrink the file and then reset the recovery mode:

```sql
use [database]
ALTER DATABASE [database]SET RECOVERY SIMPLE WITH NO_WAIT
DBCC SHRINKFILE([logfilename], 1)
ALTER DATABASE [database] SET RECOVERY FULL WITH NO_WAIT
```