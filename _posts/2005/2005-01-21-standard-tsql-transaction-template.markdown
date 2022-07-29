---
layout: post
title: Standard T-SQL transaction template
date: 2005-01-21 00:00:00
tags: [sql]
published: true
---

A basic template for transactions in a stored procedure.

```sql
BEGIN TRANSACTION

-- do updates etc 

IF @@ERROR <> 0 
	ROLLBACK TRANSACTION
ELSE
	COMMIT TRANSACTION
```