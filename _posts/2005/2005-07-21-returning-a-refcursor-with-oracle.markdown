---
layout: post
title: Returning a RefCursor with Oracle
date: 2005-07-21 00:00:00
tags: [plsql,oracle]
published: true
---

Snippet for returning a ref cursor from a PL/SQL function:

```sql
FUNCTION my_function() RETURN SYS_REFCURSOR IS
	ref_cursor SYS_REFCURSOR;
BEGIN
OPEN ref_cursor FOR
	SELECT * FROM my_table;
	RETURN (ref_cursor);
END;
```
  