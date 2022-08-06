---
layout: post
title: Building Code Documentation with SandCastle
date: 2009-08-05 15:09:00
tags: [sandcastle]
published: true
---

I've always used nDoc for building code documentation, and then (around 2 years ago) I shifted to Sandcastle 
Help File Builder. We're wanting to start documenting code at work, so today I downloaded the latest version 
(along with Sandcastle to give the latest versions a whirl.

I was presently surprised. The previous version of SHFB was just an nDoc clone, but now it's moved on a lot. 
It's got a whole pile of nice features now, including caching of all the stuff that used to make a build really 
slow; HTMLHelp 2; and more.

The best addition though is the support for static content. I actually couldn't figure out how to do it at 
first - in nDoc there used to be an AdditionalContent option (or something to that affect), and I knew the 
latest version of SHFB had support for this but I couldn't find an option for it. Google returned pre-2006 
results which were incorrect. It was staring me in the face all along though - the newest version works 
like a VS solution - all you need to do is add the files to your solution and they get automatically 
incorporated. Very nice.

Overall, I'm very impressed - it's literally hundreds of times faster than the previous verison I used 
(if you enable the custom build components that come built-in) and it creates a far slicker output file.

**Update: Error Using MSBuild**

The latest version of SHFB no longer has a console application included - you need to use MSBuild instead. 
However, when trying to hook up my project to MSBuild as per the documentation, I kept getting the following error:

```batch
error MSB4057: The target "Build" does not exist in the project.
```

I think there's a bug in SHFB where it isn't building the project file correctly. Adding the following line 
at the bottom of my .shfbproj file sorted the issue out:

```xml
<Import Project="$(SHFBROOT)SandcastleHelpFileBuilder.targets" />
```

You can add this directly above the closing </Project> tag.