---
layout: post
title: Using the Oracle XMLType
date: 2005-07-15 00:00:00
tags: [plsql,oracle]
published: true
---

**Getting the value of an xml element in a CLOB**

In this example, xml is stored in a CLOB, and you want to retrieve the value of a certain element:

```sql
SELECT EXTRACTVALUE(VALUE(xml), '/your/xpath/query')
INTO yourVarChar
FROM TABLE(XMLSEQUENCE(XMLTYPE(rec.manual_xml).EXTRACT('/'))) xml;
```

**Updating an XML element stored as a CLOB**

This is the reverse of the previous example - if you want to update the value of the same XML element stored in a CLOB field:

```sql
UPDATE YourTable t 
SET t.xml_field = UPDATEXML(XMLTYPE(t.xml_field), '/your/xpath/query/text()', 'new_value').getClobVal()
WHERE t.id = 100;
```
  