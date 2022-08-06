---
layout: post
title: Backing up and Restoring SQL Server Databases with .NET
date: 2009-08-07 15:08:00
tags: [sqlserver,c#]
published: true
---

I needed to create a tool that would do some backing up and restoring of databases as part of a long-running 
job this week. I had heard it was fairly simple C# code, but I was pleasantly surprised when I realised just 
HOW simple it is.

The namespaces of the SMO libraries required changed between 2005 and 2008, so if you're using the SQL Server 
2008 objects, you need to reference the following libraries (usually located in C:\Program Files\Microsoft SQL Server\100\SDK\Assemblies). 
If you're using SQL Server 2005 you only need the first two.

```csharp
Microsoft.SqlServer.ConnectionInfo
Microsoft.SqlServer.Smo
Microsoft.SqlServer.SmoExtended
Microsoft.SqlServer.Management.Sdk.Sfc
```

**Backing Up Code**

```csharp
SqlConnection conn = new SqlConnection("ConnectionString!");
Server dbServer = new Server(new ServerConnection(conn));
Backup backupMgr = new Backup();
backupMgr.Devices.AddDevice("E:\Backups\YourFile.bak", DeviceType.File);
backupMgr.Database = conn.Database;
backupMgr.Action = BackupActionType.Database;
backupMgr.SqlBackup(dbServer);
```

**Restoring Code**

```csharp
SqlConnection conn = new SqlConnection("ConnectionString!");
Server dbServer = new Server(new ServerConnection(conn));
Restore restoreMgr = new Restore();
restoreMgr.Devices.AddDevice("E:\Backup\MyFile.bak", DeviceType.File);
restoreMgr.Database = conn.Database;
restoreMgr.Action = RestoreActionType.Database;
restoreMgr.SqlRestore(dbServer);
```