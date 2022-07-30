---
layout: post
title: Oracle - Joining strings in a recordset
date: 2006-01-19 00:00:00
tags: [oracle,plsql]
published: true
---

Sometimes for front-end applications it's useful to display a list of items to a user, but those items are stored as multiple records in a database table.
This function takes a single field in a cursor and joins the values together into a delimited string.

```sql
FUNCTION join_records(p_key_name  IN VARCHAR2
                     ,p_key_val   IN VARCHAR2
                     ,p_column    IN VARCHAR2
                     ,p_table     IN VARCHAR2
                     ,p_delimiter IN VARCHAR2 DEFAULT ',') RETURN VARCHAR2 AS
  v_result  VARCHAR2(4000);
  v_sep     VARCHAR2(1);
  v_val     VARCHAR2(4000);
  refcursor SYS_REFCURSOR;
BEGIN

  OPEN refcursor FOR 'SELECT ' || p_column || '
                      FROM ' || p_table || '
                      WHERE ' || p_key_name || ' = :x '
    USING p_key_val;

  LOOP
    FETCH refcursor
      INTO v_val;
    EXIT WHEN refcursor%NOTFOUND;
    v_result := v_result || v_sep || v_val;
    v_sep    := p_delimiter;
  END LOOP;
  CLOSE refcursor;

  RETURN v_result;
END;
```

**Usage**

```sql
your_package.join_records('pk_col', '1', 'my_col', 'my_table')
```

**UPDATE : Stragg Function**

A much better way of doing this is described on [Ask Tom](http://asktom.oracle.com/pls/ask/f?p=4950:8:18238143072570984989::NO::F4950_P8_DISPLAYID,F4950_P8_CRITERIA:15637744429336). This is MUCH faster - the column is kind of hard to read so I've duplicated the necessary code here - note that I had no contribution whatsoever with this code.

```sql
CREATE OR REPLACE FUNCTION stragg(input varchar2 )
 RETURN varchar2
 PARALLEL_ENABLE AGGREGATE USING string_agg_type;

CREATE OR REPLACE type string_agg_type as object
  (
    total varchar2(4000),

    static function
         ODCIAggregateInitialize(sctx IN OUT string_agg_type )
         return number,

    member function
         ODCIAggregateIterate(self IN OUT string_agg_type ,
                              value IN varchar2 )
         return number,

    member function
         ODCIAggregateTerminate(self IN string_agg_type,
                                returnValue OUT  varchar2,
                                flags IN number)
         return number,

    member function
         ODCIAggregateMerge(self IN OUT string_agg_type,
                            ctx2 IN string_agg_type)
         return number
 );


CREATE OR REPLACE type body string_agg_type
  is
  static function ODCIAggregateInitialize(sctx IN OUT string_agg_type)
  return number
  is
  begin
      sctx := string_agg_type( null );
      return ODCIConst.Success;
  end;

  member function ODCIAggregateIterate(self IN OUT string_agg_type,
                                       value IN varchar2 )
  return number
  is
  begin
      self.total := self.total || ',' || value;
      return ODCIConst.Success;
  end;

  member function ODCIAggregateTerminate(self IN string_agg_type,
                                         returnValue OUT varchar2,
                                         flags IN number)
  return number
  is
  begin
      returnValue := ltrim(self.total,',');
      return ODCIConst.Success;
  end;

  member function ODCIAggregateMerge(self IN OUT string_agg_type,
                                     ctx2 IN string_agg_type)
  return number
  is
  begin
      self.total := self.total || ctx2.total;
      return ODCIConst.Success;
  end;
end;
```

**Usage**

```sql
SELECT stragg(your_column) FROM your_table WHERE rownum < 10;
```
