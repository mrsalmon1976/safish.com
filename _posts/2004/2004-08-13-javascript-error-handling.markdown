---
layout: post
title: JavaScript Error Handling
date: 2004-08-13 00:00:04
tags: [javascript]
published: true
---

Error trapping with JavaScript only works for newer generation browsers. However, older browser generally 
ignore window.onerror code, so it is worth putting in. There are two ways to do this:

*Handling Errors via the window.onerror DHTML Event*

```javascript
function reportError(msg,url,line) {
  // do what you want with the message (msg), url (url) 
  // and line number (line) here
  return true;
}

window.onerror = reportError;
```
	
*Handling Errors via ECMAScript 2.0 Exception Handling*

```javascript
  try {
    // code that may cause an error
  }
  catch (exception) {
    alert(err.number + ' ' + err.description);
  }
  finally {
     // code that is always executed
  }
```