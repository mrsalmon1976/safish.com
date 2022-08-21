---
layout: post
title: Using SQL Server's BCP Import Utility
date: 2013-02-06 17:10:00
tags: [sqlserver]
published: true
---

I had an issue today trying to get data from a client where we had access to their database via their VPN, but couldn't do a straight SQL Server transfer. I opted to use the bcp utility to export the table to a 0.75GB file, which I was then able to zip up, download, and then import again to our local database, once again using bcp. I had never used to the tool before, but it was really easy to use, and I thought I would document it here for my future reference.

**Export**

I needed a filtered subset of all the data in a table, so I opted to use a query for the import.

```batch
bcp "SELECT  FROM [dbo].[DataTable] WHERE [Description] like '%example%'" queryout "C:\Temp\MyData.txt" -c -S 10.1.0.18 -d ClientDb -b 1000 -U MyUser -P MyPassword
```

This statement executes a query against the "ClientDb" database, using the user name "MyUser" and password "MyPassword" on the server 10.1.0.18, executed in batches of 1000. This is then all exported into a file called "MyData.txt".

**Import**

Import was straight-forward, I just wanted to dump all the data into a local database.

```batch
bcp Temp_Table in "C:\Temp\MyData.txt" -c -T -E -S MyServer -d LocalDb -b 100000
```

This statement imports all the data in the text file to the table "Temp_Table" in the "LocalDb" database, on the server "MyServer" using a trusted connection (-T),

I found this a really easy way of doing an export/import. In my case the source table contained a large amount of binary data, so transferring the data to my local machine took just under an hour, at a rate of 0.14 rows per second, resulting in a 375MB table. However, the import was very fast, and even with all that data it only took 35 seconds, averaging around 14 rows per second.