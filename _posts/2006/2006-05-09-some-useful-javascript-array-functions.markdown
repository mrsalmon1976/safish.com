---
layout: post
title: Some useful Javascript Array functions
date: 2006-05-09 00:00:00
tags: [javascript]
published: true
---

**Removing elements**

Use this function to remove elements from an array.

```javascript
Array.prototype.remove = function(index) {
    // create a temporary array, and remove items from the main array 
    // until you get to the index you want - and don't add that element
    var arr = new Array();
    while (this.length > index) {
        var element = this.pop();
        if (this.length > index) arr[arr.length] = element;
    }
    // now go back and add all elements in the temp array back - using 
    // concat() would be cleaner but doesn't seem to work correctly in IE
    while (arr.length > 0) {
        var element = arr.pop();
        this[this.length] = element;
    }
}
```

For example, to remove element 1 from your array, all you need to do is call

```sql
yourArray.remove(1);
```

**Contains**

This function can be used to see if an array contains a certain element.

```sql
// Adds a contains() function to the JavaScript array object
// @param	obj		The object to search for - returns true if the array already contains the object, else false
Array.prototype.contains = function(obj) {
  for (var i=0; i<this.length; i++) {
    if (this[i] == obj) return true;
  }
  return false;
}
```

To see if your element contains a particular object:

```sql
if (yourArray.contains(yourObject)) alert('Yes!');
```
