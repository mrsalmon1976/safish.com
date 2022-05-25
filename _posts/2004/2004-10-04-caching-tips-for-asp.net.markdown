---
layout: post
title: Caching tips for ASP.NET
date: 2004-10-04 00:00:00
tags: [asp.net,c#]
published: true
---

## Caching - File Dependancies

You can output the contents of a file from the cache, and ASP.NET provides the facility to clear the cache whenever the contents of the file change. For example:

```csharp
DataSet ds = (DataSet)Cache["MyInfo"];
if (ds == null) {
	ds = new DataSet();
	ds.ReadXml(MapPath("MyInfo.xml"));
	Cache.Insert("MyInfo", ds, Caching.CacheDependency(MapPath("MyInfo.xml")));
}
// do whatever you want with the dataset here...
DropDownList1.DataSource = ds;  
...
```
  
## Output Caching

As per the microsoft documentation, pages can be cached on the server with the following:

```html
<%@ OutputCache Duration="60" VaryByParam="None" Location="Server: %>
```

This can also be cleared on another page (if someone changes the values to be shown on an item, for example), using the static RemoveOutputCacheItem method.

If you want to clear the output cache for "http://yourserver/webSiteRoot/cachedFile.aspx", then in your page that does the clear call, do the following:

```csharp
HttpResponse.RemoveOutputCacheItem("/webSiteRoot/cachedFile.aspx"); 
```

## Output Caching - Clearing using Cache Dependencies

An easier way to remove output caching from multiple pages is to attach a cache dependency on those pages. In the page that is actually cached:

```csharp
string cacheKey = "mypage.aspx?" + parameters; 
Cache[cacheKey] = new object(); 
Response.AddCacheItemDependency(cacheKey); 
```

Then, on the page that invalidates the cache (for example, an admin page that inserts/updates database records):

```csharp
string cacheKey = "mypage.aspx?" + parameters; 
Cache.Remove(cacheKey); 
```