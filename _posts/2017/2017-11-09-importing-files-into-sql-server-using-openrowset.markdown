---
layout: post
title: Importing files into SQL Server using OPENROWSET
date: 2017-11-09 12:17:00
tags: [sqlserver]
published: true
---

I've used OPENROWSET to import Excel documents for years, but I was playing around today with CSV and Pipe-delimited files, and there are some tricks to these that I thought I would document for future reference.

All the examples below assume you have a folder F:\MyData *on your server*. I emphasise this, because if you run the below scripts using SSMS on your machine, that is not the same F: drive - it is the F: drive the *server* sees.

**Excel**

Excel documents go in really easily. You just need the name of the Sheet you want to import - in my example below I am importing all data from sheet "Sheet1" into table "MyExcelData".

```sql
SELECT * 
	INTO MyExcelData 
	FROM OPENROWSET('Microsoft.ACE.OLEDB.12.0', 'Excel 12.0;Database=F:\MyData\MyFile.xlsx', [Sheet1$]) 
```

**CSV**

Second easiest, is a CSV document. Be warned, you will need to make sure that it is an ANSI-compliant file (or that there are no commas in the data), otherwise you will end up with columns named "F1", "F2", "F3" in your generated table.

```sql
select * 
	INTO MyCsvData
	FROM OPENROWSET('MSDASQL'
		,'Driver={Microsoft Access Text Driver (*.txt, *.csv)};'''
		,'SELECT * FROM F:\MyData\MyFile.csv')
```

**Delimited text files (e.g. pipe-delimited)**

Last, but not least, is a delimited document. In this case, it works similar to CSV, but when you try and import as per the above statement, you will end up with all the data in a single column. As such, you will need a Schema.ini file, that contains data about your file and is accessible to your server. In my example, I declare the DefaultDir as the place where the Schema.ini file resides.

Firstly, the Schema.ini. This file must contain details for each file that is being imported, where the heading of each section is the name of the file. So, if I am importing a pipe-delimited file called MyDelimitedFile.txt, that has headers in the column, my Schema.ini will have the following contents:

```ini
[MyDelimitedFile.txt]
    ColNameHeader=True
    Format=Delimited(|)
```

The SELECT statement must then reference the DefaultDir, and the delimiters will be used to determine the columns.

```sql
SELECT * 
	INTO MyDelimitedData
	FROM OPENROWSET('MSDASQL'
	,'Driver={Microsoft Access Text Driver (*.txt, *.csv)};DefaultDir=F:\MyData'''
	,'SELECT * FROM F:\MyData\MyDelimitedFile.txt')
```



	
