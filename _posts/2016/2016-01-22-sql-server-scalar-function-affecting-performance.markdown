---
layout: post
title: SQL Server - Scalar Function Affecting Performance
date: 2016-01-22 13:49:00
tags: [sqlserver]
published: true
---

I was looking into poor performance issue on a data warehouse report today, and noticed this line as one of the columns being returned in the SELECT statement:

```sql
schema.MyFunction(table.DateColumn) 
```

The query as a whole has around 7 joins and returns 5500 records. This is a fairly small data set, but without this line the query was running in under 2 seconds - with the scalar function being called it was taking 14 - 20 seconds. However, when I looked into the function it really wasn't doing very much - it wasn't very well written but it didn't have any hidden SELECT statements or anything that would cause an obvious performance issue. All it was doing, was formatting the date being passed to it.

The function itself wasn't the problem - it was the recursive call of the scalar function that was the issue. Basically, this speaks to the way SQL Server optimises - it just cannot optimise that function as part of its query plan, and executes it 5500 times - once for every row.

So what's the solution? If the function encapsulates logic that you don't want spread across reports, you can't remove the function. Your best option is to use a TABLE valued function instead of a scalar. Firstly, you need to rewrite your function as follows:

```sql
CREATE FUNCTION [cadi].[MyFunction] (@Date as smalldatetime)
RETURNS TABLE WITH SCHEMABINDING
AS
RETURN (
       select right(convert(varchar, @Date, 106), 8) AS MyDate
)
```

Then, you need to add remove the function from the SELECT portion of your query and CROSS APPLY it - as follows:

```sql
SELECT MyTableResult.MyDateColumn, 
t.Detail
FROM dbo.MainTable t
INNER JOIN dbo.OtherTable o ON t.Id = o.ForeignKeyId
CROSS APPLY dbo.MyFunction(t.MyDateColumn) AS MyTableResult
WHERE t.Status = 1
```

In my particular scenario, applying the TABLE function as opposed to SCALAR resulted in performance going down to 2 seconds i.e. no appreciable hit on performance at all.