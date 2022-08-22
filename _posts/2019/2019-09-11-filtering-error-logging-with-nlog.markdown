---
layout: post
title: Filtering error logging with NLog
date: 2019-09-11 16:00:00
tags: [nlog]
published: true
---

You always want to log errors on your live systems, but sometimes there are errors that occur that you are not interested in and don't want to code around. For example, a client disconnects in the middle of a web request. NLog allows you to add filters to ignore these errors at a logger level. So, you could log all errors to a database AND to email, but specific errors would not get emailed and fill up your mailbox!

```xml
<rules>
<logger name="*" minlevel="Error" writeTo="Database" />
<logger name="*" minlevel="Error" writeTo="email">
    <filters>
        <when condition="contains('${aspnet-request:serverVariable=HTTP_URL}','Token') and contains('${exception:format=Message}','task was canceled')" action="Ignore" />
    </filters>
</logger>
```