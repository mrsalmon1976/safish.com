---
layout: post
title: Dynamically load text files into SQL Server with BULK INSERT
date: 2022-05-13 21:33:00
tags: [sqlserver]
published: true
---

Loading raw text data into SQL Server can be done using Flat File import or Data Imports, but I find this is always problematic as it does row scans to predict data types, but invariably fails on large data sets due to bad data types further down the file, or column sizes being predicted too small. Using BULK INSERT also fails in a similar fashion, and requires setting up column mappings.

I found a great way to do this dynamically using the XML data type - this was not my idea, but unfortunately I lost the link of the page where I found the technique.

```sql
IF (EXISTS (SELECT * 
             FROM INFORMATION_SCHEMA.TABLES 
             WHERE TABLE_SCHEMA = 'dbo' 
             AND  TABLE_NAME = 'MyTable'))
BEGIN
DROP TABLE MyTable
END
GO

IF (OBJECT_ID('tempdb..#data') IS NOT NULL) DROP TABLE #data
CREATE TABLE #data (data VARCHAR(MAX))

BULK INSERT #data FROM 'C:\temp\MyDataFile.txt' WITH (FIRSTROW = 2, ROWTERMINATOR = '\n')

IF (OBJECT_ID('tempdb..#dataXml') IS NOT NULL) DROP TABLE #dataXml
CREATE TABLE #dataXml (ID INT NOT NULL IDENTITY(1,1) PRIMARY KEY CLUSTERED, data XML)

INSERT #dataXml (data)
SELECT CAST('<r><d>' + REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(data, 0x1F, ''), '<', '&lt;'), '>', '&gt;'), '&', '&amp;'), '|', '</d><d>') + '</d></r>' AS XML)
FROM #data

SELECT  d.data.value('(/r//d)[1]', 'varchar(max)') AS [Column 1],
    d.data.value('(/r//d)[2]', 'varchar(max)') AS [Column 2],
    d.data.value('(/r//d)[3]', 'datetime2') AS [Another Date Column] INTO MyTable
FROM #dataXml d

DROP TABLE #data
DROP TABLE #dataXml

SELECT TOP 100 * from MyTable
SELECT COUNT(*) AS [RowCount] FROM MyTable
```

This allows you to create a completely dynamic table, reading from a pipe-delimited text file. You can tweak the data types declared when you read out of the XML as you learn the data in the file.