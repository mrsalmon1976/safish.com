---
layout: post
title: Moq - Ignoring Arguments
date: 2009-11-13 08:41:00
tags: [moq,c#]
published: true
---

I've always used Rhino Mocks as a mocking framework, but at work we recently made the decision to give 
Moq a try.

My initial reaction is: WOW! It is just SO much easier to use. I've always found the setting up of mocks 
and verification of method calls a tedious task, but using Moq I've actually found it's really simple. 
It's a far more intuitive framework, and once I've got around my Rhino Mock habits, I've really found 
that the amount of code required for mocking is drastically reduced.

One very simple thing that stumped me today though, was trying to verify a method was called, but telling 
Moq to ignore the argument that was passed. In this case Rhino Mocks is a little more intuitive - it has 
an IgnoreArguments() method that chains off the setup. In the end though, the Moq implementation is 
actually easier - you just make your Setup or Verify call and use the "It" class to generate your stub.

In my example:

```csharp
myMockedClass.Verify(x => x.Connect(It.IsAny<MyArgumentType>()));
```
