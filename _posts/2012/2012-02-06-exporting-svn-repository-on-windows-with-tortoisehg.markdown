---
layout: post
title: Exporting an SVN repository on Windows with TortoiseHg
date: 2012-02-06 12:22:00
tags: [mercurial,svn]
published: true
---

Exporting an SVN repository to an Hg repo is dead easy with the latest version of TortoiseHg:

1. Open Workbench, and click File...Settings...Extensions
2. Select the "convert" checkbox and restart work bench
   ![Hg Convert Extension!](../assets/img/2012/export-svn_tn.jpg "export-svn_tn.jpg")
3. From the command prompt, run `hg convert http://<yoursubversionrepo/> <yourdestinationfolder>`, and you're done!