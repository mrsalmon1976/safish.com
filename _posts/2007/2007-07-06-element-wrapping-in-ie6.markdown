---
layout: post
title: Element Wrapping in IE6
date: 2007-07-06 00:00:00
tags: [ie6]
published: true
---

Now that tables are no longer acceptable for use when creating displays, there remains a problem when trying to get a row of elements to always display as a row without wrapping. In IE7 and Firefox, you can get it to behave fairly easily, but in IE6 it's actually impossible without using a table.

However, using browser sniffing, you can get a row of elements to always display on a single line with the following code:

```html
<!--[if lte IE 6]><table><tr><td style="display:inline;"><![endif]-->
<div class="TreeNode ">
  <div class="NoText" style="display:inline;"><IMG height="20" alt="" src="images/img1gif" width="16"></div>
  <img alt="" src="images/img2.gif" />
  <a class="TreeText" title="Some title" href="javascript:myFunction()">My example</A>
</div>
<!--[if lte IE 6]></td></tr></table></a><![endif]-->
```

This effectively wraps the elements in a mini table for IE6 only. If you want to use browser sniffing, only output the commented lines if the browser is IE6.
