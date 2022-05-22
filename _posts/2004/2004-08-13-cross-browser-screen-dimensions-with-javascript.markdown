---
layout: post
title: Cross-browser screen dimensions with JavaScript
date: 2004-08-13 00:00:07
tags: [javascript]
published: true
---

In order to calculate the user's available screen width and height use the screen object:

```javascript
// available dimensions excluding toolbars
screen.availWidth
screen.availHeight

// screen size
screen.height
screen.width
```

However, in order to calculate the size of the screen actually showing, you need to make the following calls AFTER the page has loaded:

*Netscape*

```javascript
// gets the size of the visible window
window.innerWidth
window.innerHeight
// gets the size of the document
document.width
document.height
```

*Internet Explorer*

```javascript
// gets the size of the visible window
document.body.clientHeight
document.body.clientWidth
// gets the size of the document
document.body.scrollHeight
document.body.scrollWidth
```

*Example:* You want a div to stretch from top to bottom:

```javascript
  var oFill = document.getElementById("mnuFill");
  var iFill = (ie ? document.body.clientHeight : window.innerHeight);
  if (ie && (document.body.scrollHeight > iFill)) {
    iFill = document.body.scrollHeight;
  }
  if ((!ie) && (document.height > iFill)) {
    iFill = document.height;
  }
  oFill.style.height = (iFill) + 'px';
```