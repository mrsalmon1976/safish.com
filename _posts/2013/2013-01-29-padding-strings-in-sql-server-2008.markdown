---
layout: post
title: Padding strings in SQL Server 2008
date: 2013-01-29 13:12:00
tags: [sqlserver]
published: true
---

There are often cases when you need to format a string or number into a string with a specified length. SQL 
Server 2008 doesn't have an inbuilt "PAD" function, but you can get around that with some String functions.

For example, you want to format an integer value into a 6-digit string, where the integer is of variable 
length, and any missing digits must be padded with a '0'. In SQL Management Studio, run the following script to generate some test data:

```sql
CREATE TABLE #temp (Id int null)

INSERT INTO #temp (id) VALUES (1)
INSERT INTO #temp (id) VALUES (2)
INSERT INTO #temp (id) VALUES (NULL)
INSERT INTO #temp (id) VALUES (5)
INSERT INTO #temp (id) VALUES (47)
INSERT INTO #temp (id) VALUES (123)
INSERT INTO #temp (id) VALUES (54789)
INSERT INTO #temp (id) VALUES (154789)
```

You can now use a combination of LEFT / RIGHT, LTRIM and REPLICATE to pad your string with leading or trailing characters:

```sql
SELECT 
	Id AS OriginalValue,
	(SELECT RIGHT(REPLICATE('0', 6) + LTRIM(Id), 6)) AS PaddedLeft,
	(SELECT LEFT(LTRIM(Id) + REPLICATE('0', 6), 6)) AS PaddedRight
	FROM #temp
```

Running this will result in the following output:

![SqlServerPad!](../assets/img/2013/sqlserver-pad.png "sqlserver-pad.png")