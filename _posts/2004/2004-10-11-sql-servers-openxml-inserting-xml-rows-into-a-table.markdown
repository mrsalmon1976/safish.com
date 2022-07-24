---
layout: post
title: SQL Server's OPENXML - Inserting XML rows into a table
date: 2004-10-11 00:00:01
tags: [sqlserver]
published: true
---

The OPENXML command provides a rowset view over an XML document and can be used to insert the contents of an XML document into a table.

```sql
CREATE PROCEDURE Test
  @pXml text
AS
  DECLARE @iDoc int
  -- create an internal representation of the XML document.
  EXEC sp_xml_preparedocument @iDoc OUTPUT, @pXml
  -- execute a SELECT statement that uses the OPENXML rowset provider.
  INSERT INTO <table>
    SELECT Col1, Col2 FROM OPENXML (@iDoc, '/root/child', 1)
  WITH 
  (
    Col1  varchar(10),
    Col2 varchar(40)
  )
  EXEC sp_xml_removedocument @iDoc
```

If you get namespace declaration problems, clean your xml before you pass it into the stored procedure, for example:

```sql
string xml = "<root>" + xmlDoc.DocumentElement.InnerXml + "</root>";
xml = xml.Replace("<ns:", "<");
```