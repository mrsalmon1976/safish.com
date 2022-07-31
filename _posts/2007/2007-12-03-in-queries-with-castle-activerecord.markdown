---
layout: post
title: IN queries with Castle ActiveRecord
date: 2007-12-03 00:00:00
tags: [c#]
published: true
---

Rather than do a String.Format, ActiveRecord has a Query.SetParameterList("Param", IList<Values>) 
method that can be used for IN statements. Doing it this way allows for query caching, as well as simpler code. In the following example, lstKeys is a List<int> object.

```csharp
string hql = String.Format("FROM MyObject o WHERE o.Pk.Key in (:keys) ORDER BY o.SomeColumn");

SimpleQuery<MyObject> q = new SimpleQuery<MyObject>(hql);
q.SetParameterList("keys", lstKeys);
q.SetQueryRange(25);
MyObject[] result = q.Execute();
```