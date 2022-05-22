---
layout: post
title: JavaScript Trim Method
date: 2004-08-13 00:00:05
tags: [javascript]
published: true
---

There are number of ways you can trim strings using javascript. The best way is to prototype 
the string object, adding a trim method, so you can perform the action by merely calling 
"string.trim()".

Regular expressions provide a slick way of trimming strings, but at the time of writing regular 
expression implementations can be buggy in some browsers, and you may find it doesn't always 
work. This will probably be the standard going forward.

**Trimming with Regular Expressions**

```javascript
  // Add a function called trim as a method of the prototype 
  // object of the String constructor.
  String.prototype.trim = function() {
    // Use a regular expression to replace leading and trailing 
    // spaces with the empty string
    return this.replace(/^(s+)?(.*S)(s+)?$/, '$2');
  }
```

For now, a more reliable way is to just use the substring method and just loop through the 
string characters. The following three methods provide a left trim, right trim and full trim:

**Trimming using substrings**

```javascript
  // remove leading whitespace
  String.prototype.ltrim = function() {
    var str = this;
    while (str.length > 0) {
      var ch = str.substr(0,1);
      if ((ch == ' ') || (ch == '\n') || (ch == '\r') || (ch == '\t') || (ch == '\f')) {
        str = str.substring(1);
      }
      else {
        break;
      }
    }
    return str;
  }

  // remove trailing whitespace
  String.prototype.rtrim = function() {
    var str = this;
    while (str.length > 0) {
      var ch = str.substr(str.length - 1, 1);
      if ((ch == ' ') || (ch == '\n') || (ch == '\r') || (ch == '\t') || (ch == '\f')) {
        str = str.substring(0, str.length - 1);
      }
      else {
        break;
      }
    }
    return str;
  }

  // remove leading and trailing whitespace
  String.prototype.trim = function() {
    var str = this.ltrim();
    return str.rtrim();
  }
```