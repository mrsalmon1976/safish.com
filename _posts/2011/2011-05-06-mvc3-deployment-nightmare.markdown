---
layout: post
title: MVC3 Deployment Nightmare
date: 2011-05-06 17:07:00
tags: [asp.net]
published: true
---

I had a freaking nightmare deploying an MVC3 app today.  Seems simple.  Database was up and running.  
The code was deployed and had been tested on our local systems.  I deployed via our amazing SVN 
deployment process, and published on the live server.  Permissions applied automatically, all the files 
appeared – all was good in the world.  Until I loaded up the site in my browser and hit...

**Infinite Redirects**

Fan-freaking-tastic.  Double-check the Web.config.  Fine.  Double-check the IIS mappings.  Fine. This ruined my day.  To cut a long story short: this all boils down to conflicts between the versions of MVC3 binaries between RC1 and RC2.  If you search on the web you will find numerous references to issues with the get_viewBag() call, and to be honest, I didn't have to time to fully understand WHY this is such a cockup.

Either way, the solution I finally came up with was to UNINSTALL MVC3 on the web server, manually add the .dll references to our project, and force "Copy Local".

http://www.tugberkugurlu.com/archive/deployment-of-asp-net-mvc-3-rc-2-application-on-a-shared-hosting-environment-without-begging-the-hosting-company

The DLLs that must be referenced:

- Microsoft.Web.Infrastructure
- System.Web.Razor
- System.Web.WebPages
- System.Web.WebPages.Razor
- System.Web.Helpers
- System.Web.WebPages.Deployment (If you are deploying MVC RC 2, this assembly is necessary to deploy)
- System.Web.Mvc

Make sure these copy locally to your bin folder (Right click, Properties, Copy Local = true)

This sorted out that bug.  Enter the next issue: The type or namespace name 'WebMatrix' could not be found (are you missing a using directive or an assembly reference?).  WTF!?

**Web Matrix Agony Part 1**

MVC3 RC2 has a bug where some of the source files have "using WebMatrix" references in them. As such, even though you don't need them, your project will not run without a reference to WebMatrix, which is annoying.

The obvious solution is to add these as a reference, but I tried that and it fails because WebMatrix requires an initialisation call in the Global.asax. Bummer.  I redeployed, and my error message now changed to

You must call the "WebSecurity.InitializeDatabaseFile" or "WebSecurity.InitializeDatabaseConnection" method before you call any other method of the "WebSecurity" class.

EFF THIS.

**Web Matrix Agony Part 2**

To get around this, in your global.asax make sure you add the following code at the bottom of the file:

```csharp
namespace WebMatrix.Data { internal class Ignore { } }
```