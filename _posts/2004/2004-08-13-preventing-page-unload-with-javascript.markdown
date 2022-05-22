---
layout: post
title: Preventing page unload with JavaScript
date: 2004-08-13 00:00:02
tags: [javascript]
published: true
---

The onbeforeunload event handler (supported by Internet Explorer 4+ only) can be used to confirm that the user 
does want to close the browser window or navigate away from the current page. If your event handler returns 
something, this message will be included in a confirmation which the user must click OK to. If you do not return 
anything, the event handler is ignored:

```javascript
var saved = false;

window.onbeforeunload = unloadHandler;

function unloadHandler() {
	msg = "You will lose all data associated with this screen."
	if (saved) return msg;
}
```