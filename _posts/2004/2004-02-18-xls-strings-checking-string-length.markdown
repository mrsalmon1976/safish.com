---
layout: post
title: XSL strings - checking string length
date: 2004-02-18 00:00:00
tags: [xsl]
published: true
---

In your XSL transforms, you can add logic dependent on string length as follows:

```xml
  <xsl:choose>
    <xsl:when test="string-length(@sec) >= 12">
      <xsl:value-of select="substring(@sec,0,12)"/>...
    </xsl:when>
    <xsl:otherwise>
      <xsl:value-of select="@sec"/>
    </xsl:otherwise>
  </xsl:choose>
```