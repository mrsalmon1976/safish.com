---
layout: post
title: Reconciling client-side and server-side lookup values with T4 Templates
date: 2013-01-11 09:59:00
tags: [T4]
published: true
---

One of the challenges when creating web applications is the separation of logic between the client and the server. Most solutions will have the concept of "lookups" e.g. categories or some type of data that is static but necessary for the business logic. In terms of the server-side code, you will usually reference these using enums or constants, so they are not scattered throughout your solution in code.

However, you often will need to execute logic on the client using these same lookup values. This means you need to declare them again, which can result in the client and the server-side code going out of sync if the lookups change. One nice way to tackle this if you're using Visual Studio is with the use of T4 templates.

**Example**

You have an "Animal" class declared in your C# project and you want some of the const values exposed on the client.

**T4 Template**

```
<#@ template language="C#" #>
<#@ output extension=".js" #>
<#@ assembly name="System.Data" #>
<#@ assembly name="System.Xml" #>
<#@ assembly name="C:\Development\MyProject\bin\MyAssembly.dll" #>
<#@ import namespace="System.Collections.Generic" #>
<#@ import namespace="MyNamespace.Lookups" #>

var Lookups = (function() {
    var pub = {};
 
    pub.Animals = (function() {    
		
	var pub = {};
	pub.Cat = '<#=MyNamespace.Lookups.Animal.Cat#>';
	pub.Dog = '<#=MyNamespace.Lookups.Animal.Dog#>';
	return pub;

    }());
 
    return pub;
}());
```

**Using the Lookups**

Once you've saved and run the T4 template, you will then have a .js file to include in your project. You can then write JavaScript as follows to use the lookup values:

```javascript
alert('Test: ' + Lookups.Animals.Dog);
```