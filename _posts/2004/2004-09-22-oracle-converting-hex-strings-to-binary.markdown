---
layout: post
title: Oracle - Converting Hex Strings to Binary
date: 2004-09-22 00:00:01
tags: [oracle,plsql]
published: true
---

This is a useful function to convert a hex string into a binary value.

```sql
CREATE PROCEDURE ConvertHexStrToBinary 
  @hexstr varchar(1000),
  @binValue binary(8) OUTPUT
AS
  DECLARE @index tinyint,
          @result bigint,
          @digit int,
          @convstr varchar(15)
	
  SELECT  @index = LEN(@hexstr),
          @result = 0,
          @convstr = '123456789ABCDEF'
	
  WHILE (@index > 2)
  BEGIN
    SELECT @digit = CHARINDEX(SUBSTRING(@hexstr,@index,1),@convstr)
    SELECT @result = @result + @digit * POWER(CONVERT(numeric, 16), LEN(@hexstr) - @index)
    SELECT @index = @index - 1
  END

  SELECT @binValue = CONVERT(binary(8),@result)
GO
```
