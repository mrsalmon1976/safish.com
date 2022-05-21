---
layout: post
title: MSXSL - Calling script functions
date: 2004-02-23 00:00:00
tags: [xsl]
published: true
---

With MSXSL, you can write VB6 functions to make your transformations a little easier:

```xml 
<msxsl:script implements-prefix="portal" language="vbscript">
<![CDATA[
  Function GetSomething(node)
	GetSomething = Mid(node.item(0).text,12)
  End Function
]]>
</msxsl:script>

..

<xsl:template match="@MY_FIELD">
<xsl:value-of select="portal:GetSomething(.)"></xsl:value-of>
</xsl:template>
```

You can also do tests against function results. For example, you pass in a value "user_privileges" to your stylesheet. Below, you can then run if tests against your function for blocks within your templates.

```xml
<xsl:stylesheet version="1.0" 
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:msxsl="urn:schemas-microsoft-com:xslt"
	xmlns:yours="urn:your-scripts">

<xsl:param name="user_privileges" />

<msxsl:script language="C#" implements-prefix="yours">
<![CDATA[
public bool checkPrivileges(string required, string privileges){
  if (required == privileges) {
	return true;
  }
  return false;
}
]]>
</msxsl:script>

..

<xsl:template match="your_node">
<xsl:if test="yours:checkPrivileges(@privileges, $user_privileges) = 'true'">

  ..

</xsl:if>
</xsl:template>
```
