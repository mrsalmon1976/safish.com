---
layout: post
title: JavaScript pad function
date: 2004-12-02 00:00:00
tags: [javascript]
published: true
---

This function allows you to pad strings e.g. to pad a date part with 0's, you'd call

```javascript
yourString = yourString.pad('0', 1);
```

```javascript
// chr      Character to pad the string with
// num      The length of the string after padding
// prepend  (Optional) True to add to beginning, false for end - defaults to true.
String.prototype.pad = function(chr, num, prepend) {
  var front = true;
  var str = this;
  if (arguments.length > 2) front = prepend;
  for (var i=str.length; i<=num; i++) {
    str = ((front) ? (chr + str) : (str + chr));
  }
  return str;
}
```