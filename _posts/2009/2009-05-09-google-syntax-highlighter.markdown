---
layout: post
title: Google syntax highlighter
date: 2009-05-09 11:10:00
tags: []
published: true
---

In setting up this blog, I was weighing up my options as to how to highlight code. You can do it manually by 
setting the colour of individual words, but that is just a pain in the ass, particularly for larger posts so 
I considered writing a JavaScript class for doing it. Fortunately, sense prevailed and I searched the web 
first, and I came across the Google syntax highlighter. This thing is awesome. It handles a number of different 
languages, displays line numbers automatically, and even has a number of utility options you can display like 
printing, clipboard copying, and more. Great stuff. Best of all, it's so easy to use. All you need to do is 
include the JavaScript files and the css file, and mark your code with some simple attributes:

```html
<pre name="code" class="brush: html">
  ... some code here ...
</pre>
```

Finally, add some JavaScript to the end of your page, and that's it.

```javascript
SyntaxHighlighter.config.bloggerMode = true;
SyntaxHighlighter.config.clipboardSwf = 'http://alexgorbatchev.com/pub/sh/current/scripts/clipboard.swf';
SyntaxHighlighter.all();
```

You don't need the first two lines of this script unless you're adding it to a blog. If you ARE adding it to a 
blog, you'll need to host the .css and .js files on an external site and add them to your blog template. The 
rest of the instructions remain the same.