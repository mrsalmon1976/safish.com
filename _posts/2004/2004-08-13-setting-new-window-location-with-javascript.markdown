---
layout: post
title: Setting new window location with JavaScript
date: 2004-08-13 00:00:00
tags: [javascript]
published: true
---

Set the location and size of a new window opened with JavaScript:

```javascript
var top = 100;
var left = 400;
var w = 280;
var h = 210;
// adjust left and top position of new window
left = (screen.availWidth / 2) - (w / 2);
top = (screen.availHeight / 2) - (h / 2);
window.open ('YourPage.htm', 'winValidation', 'width=' + w + ',height=' + h + ',
	resizable=1,left=' + left + ',top=' + top + ',scrollbars=0');
```