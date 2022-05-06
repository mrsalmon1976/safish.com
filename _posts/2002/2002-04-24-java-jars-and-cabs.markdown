---
layout: post
title: Java - Jars and Cabs
date: 2002-04-24 00:00:00
tags: [java]
published: true
---

Simple Jars
To create a simple jar, add all the class files required with the following example command-line statement:

```
jar cf MyJar.jar *.class
```

To view your applet with the above jar, in your HTML page add the following code:

```html
<applet code="StartClass.class" archive="MyJar.jar" width="100" height="100"></applet>
```

To add a directory to a jar, just type the name of the directorys with spaces in between at the end of the jar command:

```
jar cvf MyJar.jar audio classes images
```

Viewing the contents of a jar file

```
jar tf bundle.jarSimple Cabs
```

To create a CAB archive (Microsoft only), create you cab using the following command-line statement (this assumes you have downloaded the Microsoft SDK from microsoft.com):

```
cabarc n MyCab.cab TestClass.class
```

Then, to view this, add the following to your HTML page:

```html
<applet code="TestClass.class" width="100" height="100">
    <PARAM NAME="cabbase" VALUE="MyCab.cab">
</applet>
```
