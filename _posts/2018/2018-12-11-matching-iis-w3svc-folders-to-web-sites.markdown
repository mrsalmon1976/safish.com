---
layout: post
title: Matching IIS W3SVC folders to web sites
date: 2018-12-11 17:07:00
tags: [mediawiki]
published: true
---

For every web site created in IIS, a new W3SVCX folder is created in the logging folder configured for IIS. Knowing which folder applies to which site is not obvious, particularly when you have multiple sites serving the same content and it's not easy to determine this information from inspecting the log files.

The configuration can be worked out by opening the `applicationHost.Config` file in the *%WinDir%\System32\Inetsrv\Config* folder.

Under the `sites` element, each site is then listed with a unique id, for example:

```xml
<site name="mysite.mydomain.co.za" id="6" serverAutoStart="true">
```

In this case, the log files for this site will be stored in the W3SVC6 folder.