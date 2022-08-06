---
layout: post
title: WatiN with CruiseControl running as a service
date: 2009-10-06 10:10:00
tags: [watin]
published: true
---

We've started using [downloaded WatIn](http://watin.sourceforge.net/) for our automated tests: nice and 
easy to use and integrates easily, but I did hit one stumbling block: CruiseControl.NET. When running 
tests locally, there were no issues - check the code in and bang, the tests fail. It was immediately 
apparent that it was a security thing - the CruiseControl.NET service runs by default with the SYSTEM 
user, but I could find little to no help anywhere on how to set this up correctly.

One solution was to just tick the service option to "Allow service to interact with the desktop", but 
this didn't work for me - the failure remained the same when the browser instance was being created.

It took a few hours of testing (I ended up using a local Scheduled Task to test this out) and I 
finally found a fairly easy way to get it to work - on your build server you need to use a local 
account that the service runs under. I used a local admin account - you might not be able to do this 
in which case you're on your own (it'll still work - you'll just need to be more careful about how 
you apply permissions), but the steps to set this up are as follows:

- Create a local admin account (e.g. CCAdmin) - make sure you set it so the password does not need to be changed and does not expire
- Log out, and log back in using the new account
- Open up IE (or whatever your testing browser is) and go through all the dialog screens. Set the home page to blank. If you're using Firefox, make sure all the required plugins are installed.
- Open up services.msc (Start...Run....services.msc), and stop the CruiseControl.NET service. Right-click and go to Properties
- Go to the Log On tab, and instead of a Local System account, set it so the service uses your new account
- If you have not created an admin account, make sure the account has all necessary security permissions
- Click OK, and fire up the service again
