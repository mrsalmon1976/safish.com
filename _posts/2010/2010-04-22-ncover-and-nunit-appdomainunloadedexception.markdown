---
layout: post
title: NCover and NUnit AppDomainUnloadedException
date: 2010-04-22 09:28:00
tags: [ncover,nunit]
published: true
---

I lost a few chunks of hair this morning. I needed to set up some kind of code coverage so I could prove 
to a client that our unit tests were actually doing what we said they were doing. I chose [NCover](http://ncover.org/) 
as I had used it a few years ago - unfortunately I had to opt for the old, free community edition but 
maybe one day we'll be able to upgrade to the commercial version.

Anyway, getting ncover wasn't a big deal, I added the following section to the ccnet.config file for our project:

```xml
<exec>
 <executable>C:\Program Files\NCover\NCover.Console.exe</executable>
 <baseDirectory>C:Builds\myprojectSource</baseDirectory>
 <buildArgs>"C:\Program Files\NUnit 2.5.2\bin\nunit-console-x86.exe" MyProjectUnitTests.nunit /xml:..ArtifactsNunit.xml //x ..ArtifactsNcover.xml //a Assembly.1;Assembly.2;Assembly.3</buildArgs>
 <buildTimeoutSeconds>360</buildTimeoutSeconds>
</exec>
```

This worked first shot. The unit tests ran, and the code in the assemblies I'd defined was analysed and added 
to the CruiseControl report (make sure you include the output xml files in your publisher/merge section too). 
All fine and well, except now my builds were failing. Looking at the logs, the unit tests were ALL passing, everything 
was fine, except there was an unhandled AppDomain exception being raised by NUnit. Running this on my machine 
didn't produce the same result - it was only happening on the build server. The exact exception message was:

```
System.AppDomainUnloadedException: Attempted to access an unloaded AppDomain.
```

It turns out, this is strange bug in NUnit 2.5.2, and as of now, there is no fix. Fortunately, this doesn't 
happen with version 2.4.7 - so for this project all I did was point to a different version of NUnit, and the errors 
went away. The older version does seem siginificantly slower than version 2.5.2 so it's not optimal, but until a 
newer version comes out with a fix, it's good enough for me.