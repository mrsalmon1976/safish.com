---
layout: post
title: Adding HTML Attributes in XSL
redirect_from:
  - /blog/adding-html-attributes-in-xsl
date: 2001-01-08 00:00:01
tags: [xsl]
---

For example, if you want to add an image using the PRODUCTIMAGE element from your stylesheet:


```xml
<IMG>
  <xsl:attribute name="SRC"><xsl:value-of select="PRODUCTIMAGE" /></xsl:attribute>
</IMG>
```

