---
layout: post
title: Forms Authentication on Subfolders
date: 2004-10-07 00:00:00
tags: [asp.net]
published: true
---

Forms authentication generally protects your entire IIS application. However, sometimes you may want to only protect subfolders. Usually you would make the subfolder an application which would have it's own web.config file, but this has two drawbacks:

1. You need to maintain two config files
2. In shared hosting you generally aren't allowed to create extra IIS applications.

You can protect ONLY subfolders in your web.config file, as follows (This would ONLY allow the user MattS access to the "admin" subfolder):

In the main section of your config file:

```xml
<authentication mode="Forms">
	<forms name="AuthCookie" loginUrl="admin/login.aspx" timeout="30" path="/">
		<credentials passwordFormat="Clear">
			<user name="MattS" password="test"/>
		</credentials>
	</forms>
</authentication>
  
<!-- allow everyone access at the root level -->  
<authorization>
	<allow users="*"/>
</authorization>
```

At the bottom of your config file (outside the system.web tag):

```xml
<!-- allows access to the forum folder for the authenticated user MattS only -->
<location path="admin">  
	<system.web>   
		<authorization>    
			<allow users="MattS"/>
			<deny users="*"/>
		</authorization>  
	</system.web> 
</location>
```