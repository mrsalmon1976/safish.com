---
layout: post
title: JDBC - Executing stored procedures
date: 2004-11-02 00:00:00
tags: [java]
published: true
---

To execute a stored procedure on your database server with JDBC, you need to prepare a CallableStatement using your active connection. Input and output parameters but be explicitly declared.

For example, a stored procedure with an output parameter called "@pRet" and two input parameters "@p1" and "@p2":

```java
CallableStatement cstmt = null;
double res = 0.0;
try {
  cstmt = conn.prepareCall("{ ? = call MyProc(?,?) }");
  cstmt.registerOutParameter(1, Types.NUMERIC);
  cstmt.setDouble(2, 1.0);
  cstmt.setDouble(3, 2.0);
  cstmt.execute();
  res = cstmt.getDouble(1);
}
catch (SQLException e) {
  ...
}
finally {
  try {
    cstmt.close();
  }
  catch (Exception e) { }
}
```