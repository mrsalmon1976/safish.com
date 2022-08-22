---
layout: post
title: mRemoteNG prompting for password after crash
date: 2021-10-07 13:49:00
tags: [chrome]
published: true
---

I use [mRemoteNG](https://mremoteng.org/download) on a daily basis, but every now and again it crashes, prompting you for a password to load your connections. This is as a result of a corrupt connections files.

Fortunately, the application creates backups of your connections when they change. To fix, navigate to the folder in the error message, in my case this folder is *C:\Users\matt\AppData\Roaming\mRemoteNG*

In that folder will be a *confCons.xml* file. This file can be deleted or backed up, and then the last backup can be renamed to *confCons.xml*. In my case, my last backup file was *confCons.xml.20211006-1534460806.backup* . Restart mRemoteNG, and you should be good to go.



	
