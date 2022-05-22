---
layout: post
title: A JavaScript Vector object
date: 2004-08-13 00:00:01
tags: [javascript]
published: true
---

I love the convenience of the Java Vector object, and JavaScript doesn't have anything similar to use, so I created 
this basic class to emulate it.  
```javascript
/**
  Vector object simulating the vector object used in the Java programming language.
  */
  function Vector() {
    this.myArr = new Array();
    this.size = size;
    this.addElement = addElement;
    this.elementAt = elementAt;
    this.contains = contains;
    this.indexOf = indexOf;
    this.removeElementAt = removeElementAt;
    this.toString = toString;
  }

  /**
  * Function to determine how many elements are contained in the vector
  */
  function size() {
    return this.myArr.length;
  }

  /**
  * Add an element to the vector
  * @param  newElement  element to be added to the vector
  */
  function addElement(newElement) {
    var newPos = this.size();
    this.myArr[newPos] = newElement;
  }

  /**
  * Find out the item contained at a certain position in the vector
  * @param  where index to look for the item
  */
  function elementAt(where) {
    if (where > (this.size() -1)) {
      return -1;
    }
    else {
      return this.myArr[where];
    }
  }

  /**
  * Check to see whether the vector contains a specific element
  * @param  element   object you are looking for
  */
  function contains(element) {
    for (var i=0; i < this.size(); i++) {
      if (this.elementAt(i) == element) {
        // found element!
        return true;
      }
    }
    // element not found
    return false;
  }

  /**
  * Find out the specific location of a specific element
  * @param  item  Object you are looking for
  */
  function indexOf(item) {
    for (i=0; i < this.size(); i++) {
      if (item == this.elementAt(i)) {
        return i;
      }
    }
    // element not found - return -1
    return -1;
  }

  /**
  * Function to remove an element from the vector
  * @param  index   The position of the element in the vector which you want to remove
  */
  function removeElementAt(index) {
    // make a temporary array
    var tmpArr = new Array();
    var cnt = 0;
    // loop through the vector object's array, adding all elements EXCEPT the unwanted
    // element to the temp array
    for (i=0; i < this.myArr.length; i++) {
      if (i != index) {
        tmpArr[cnt] = this.myArr[i];
        cnt++;
      }
    }
    // reset the vector objects array to the temp array
    this.myArr = tmpArr;
  }

  /**
  * Get a string representation of the vector object
  * @param  passDelim (optional) Delimiter to split the elements of the string up with (defaults 
  *                   to a comma if no argument is passed.
  */
  function toString(passDelim) {
    var outStr = '';
    var commaStr = '';
    var delim = ',';
    if (arguments.length > 0) {
      delim = passDelim;
    }  
    for (var i=0; i < this.size(); i++) {
      outStr = outStr + commaStr + this.elementAt(i);
      commaStr = delim;
    }
    return outStr;
  }
```
