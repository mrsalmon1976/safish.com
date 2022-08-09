---
layout: post
title: HTTP Header Errors with MVC3 Redirects
date: 2011-05-06 16:03:00
tags: [asp.net]
published: true
---

We noticed in our error logs that we were getting quite a few of these good old errors:

`"Cannot redirect after HTTP headers have been sent."`

This wasn't affecting our system from a usability point of view, but it's irritating nonetheless. 
Anyway, the cause of the error was the following code in the `OnActionExecuting` override of a custom `ActionFilterAttribute`:

```csharp
HttpContext.Current.Response.Redirect("our url", true)
```

Looks fine, right?

The error here is that within action filter attributes, you don't know what other code is being executed 
in the request pipeline – in our case we had a BaseController adding caching headers in the `OnResultExecuting` override. 

The correct way to do this is to set the result of the filterContext object – this gets dealt with immediately and the error goes away.  The correct code is:

```csharp
filterContext.Result = new RedirectResult("our url");
```

Pretty trivial, I know, but I Googled this and found very little out there that actually describes this error and the solution.