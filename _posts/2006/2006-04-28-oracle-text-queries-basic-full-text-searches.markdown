---
layout: post
title: Oracle text queries - basic full text searches
date: 2006-04-28 00:00:00
tags: [oracle,plsql]
published: true
---


Text queries are a very complex subject in Oracle, but briefly, the following is enough for a basic full text search. 
The example searches help text in a table called "help_topic" with the column "help_text".

**Creating the index**

```sql
CREATE INDEX help_text_idx ON help_topic (help_text) INDEXTYPE IS CTXSYS.CONTEXT;
```

**Running queries against the index**

Placing a "?" in front of each word in the query enables a fuzzy search (i.e. words close to the fuzzy 
word - "?dog" finds "doug", "dojo", "dogs", "dog", etc.)

```sql
-- OR query
SELECT SCORE(1) AS score, help_text from help_topic 
WHERE CONTAINS(help_text, '?princesses | ?dogs',1) > 0
ORDER BY SCORE(1) DESC;

-- AND query
SELECT SCORE(1) AS score, help_text from help_topic 
WHERE CONTAINS(help_text, '?cats & ?dogs', 1) > 0
ORDER BY SCORE(1) DESC;
		   
-- phrase
SELECT SCORE(1) AS score, help_text from help_topic 
WHERE CONTAINS(help_text, '"some arbitrary text"', 1) > 0
ORDER BY SCORE(1) DESC;
```

**Rebuilding the index**

Whenever the underlying data changes you will need to rebuild your index, like so:

```sql
ALTER INDEX help_text_idx REBUILD NOPARALLEL
```

**Resync the index**

When you add or update records, this call is an extremely fast way of resyncing the index. This should only be 
called at the end of a transaction (not with every add/delete) and will result in fragmentation - you should 
optimize or rebuild your index regularly.

```sql
EXEC CTX_DDL.SYNC_INDEX('my_index');
```

**Optimising the index**

This can be done with FAST, FULL, or TOKEN - FAST is obviously the quickest and compacts fragmented rows, but it does not remove old data.

```sql
EXEC CTX_DDL.OPTIMIZE_INDEX('my_index','FAST');
```
