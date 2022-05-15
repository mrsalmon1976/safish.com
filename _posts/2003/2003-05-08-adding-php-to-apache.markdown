---
layout: post
title: Adding PHP to Apache
date: 2003-05-08 00:00:00
tags: [php,apache]
published: true
---

To get Apache to load mod_php at startup time, httpd.conf must be edited and the following must be typed in:

```apache
LoadModule php4_module        libexec/libphp4.so
```

underneath the Dynamic Shared Object (DSO) Support section. PHP may have already done this for you. Also, Apache must know when to use the mod_php module, therefore you will need to add this in the relevant section:

```apache
AddType application/x-httpd-php .php .phtml
```

You may also wish to edit the DirectoryIndex directive in httpd.conf to:

```apache
DirectoryIndex index.html index.php index.phtml
```

Restart apache to view PHP scripts through your web browser:

```shell
apachectl restart
```