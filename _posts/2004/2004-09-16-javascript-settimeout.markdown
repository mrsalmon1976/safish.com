---
layout: post
title: JavaScript setTimeout
date: 2004-09-16 00:00:01
tags: [javascript]
published: true
---

The setTimeout method can be used to create your own running threads in a web document.

For example, to create update a text box every second with a new date/time:

```javascript
<script language="javascript">
function setDateTime() {
	document.myForm.txtDateTime.value = new Date();
	setTimeout("setDateTime()", 1000);
}
</script>

..

<body onload="setDateTime()">
```

**Adding parameters**

You can add parameters to functions called by setTimeout as follows:

```javascript
function myFunc(p1, p2) {
}

var val1 = 'p1value';
var val2 = 'p2value';
setTimeout('myFunc("' + val1 + '","' + val2 + '")', 1000);
```
