---
layout: post
title: JavaScript replaceAll Function
date: 2004-08-13 00:00:06
tags: [javascript]
published: true
---

The JavaScript replace() function does not replace all instances of the query string - only the 
first one encountered. This function replaces all instances of the unwanted string.

```javascript
/**
 * @param strChk      String to be cleaned
 * @param strFind     String to replace
 * @param strReplace  String to insert
 * @return            String without unwanted characters/strings
 */
function replaceAll(strChk, strFind, strReplace) {
  var strOut = strChk;
  while (strOut.indexOf(strFind) > -1) {
    strOut = strOut.replace(strFind, strReplace);
  }
  return strOut;
}
```

Alternatively, a cleaner approach is to prototype the string object, effectively adding the 
replaceAll method to the string class. Using the following approach, you can then use this 
method as you would any other string method, e.g. yourstring.replaceAll('a', 'b');

```javascript
String.prototype.replaceAll = function(find, replace) {
  var str = this;
  while (str.indexOf(find) > -1) {
    str = str.replace(find, replace);
  }
  return str;
}
```