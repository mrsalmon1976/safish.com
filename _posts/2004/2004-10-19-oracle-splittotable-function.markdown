---
layout: post
title: Oracle SplitToTable Function
date: 2004-10-19 00:00:00
tags: [oracle]
published: true
---

The following text splits a delimited string to a table

```sql
CREATE FUNCTION SplitToTable (
  @list ntext , 
  @delim varchar(10)
  )
RETURNS @tbl TABLE (
  listpos int IDENTITY(1, 1) NOT NULL,
  number  int NOT NULL) 
AS
BEGIN
  DECLARE 
    @pos      int,
    @textpos  int,
    @chunklen smallint,
    @str      nvarchar(4000),
    @tmpstr   nvarchar(4000),
    @leftover nvarchar(4000) 

  SET @textpos = 1
  SET @leftover = ''
  WHILE @textpos <= datalength(@list) / 2
  BEGIN
    SET @chunklen = 4000 - datalength(@leftover) / 2
    SET @tmpstr = ltrim(@leftover + substring(@list, @textpos, @chunklen))
    SET @textpos = @textpos + @chunklen
    SET @pos = charindex(@delim, @tmpstr)
    WHILE @pos > 0
    BEGIN
      SET @str = substring(@tmpstr, 1, @pos - 1)
      INSERT @tbl (number) VALUES(convert(int, @str))
      SET @tmpstr = ltrim(substring(@tmpstr, @pos + 1, len(@tmpstr)))
      SET @pos = charindex(@delim , @tmpstr)
    END
    SET @leftover = @tmpstr
  END
  IF ltrim(rtrim(@leftover)) <> ''
  INSERT @tbl (number) VALUES(convert(int, @leftover))
  RETURN
END
```

