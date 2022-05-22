---
layout: post
title: JavaScript Regular Expressions
date: 2004-08-13 00:00:03
tags: [javascript]
published: true
---

Regular expressions are objects in JavaScript. For example, if you have an input field that should only 
allow characters a-z (lower and upper case) and numerical digits, you could use regular expressions to 
do the input validation as follows:

```javascript
function cleanData() {
  var inputStr = document.myTxtBox.value;
  var re = new RegExp("[a-z]|[A-Z]|[0-9]");
  var outStr = "";
  var c;
  for (var i=0; i < inputStr.length; i++) { 
    c = inputStr.charAt(i);
    if (re.exec(c) != null) {
      outStr += c;
    }
  }
  document.myTxtBox.value = outStr;
}
```