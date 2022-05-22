---
layout: post
title: CSS Opacity
date: 2004-07-29 00:00:01
tags: [css]
published: true
---

The following class should be applied to an element to make it opaque:

```css
.opaque {
	opacity: .5;
	filter: alpha(opacity=50);
	-moz-opacity: .5;
}
```

where:
- opacity is for Safari
- filter is for IE
- -moz-opacity is for Mozilla

This specifies an opacity of 50% i.e. semi-transparent where 100 is not transparent and 0 is completely transparent. Note that 
the width OR height of the opaque element needs to be specified for opacity to work in IE.