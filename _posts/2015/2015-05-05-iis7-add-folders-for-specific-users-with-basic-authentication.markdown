---
layout: post
title: IIS7 - Add folders for specific users with Basic Authentication
date: 2015-05-05 17:02:00
tags: [iis]
published: true
---

I needed to set up a web site that has a basic page for browsing as the root, but within that site there should also be download folders secured for different users. The folders don't require a web page, just browsable content. The issue I had was that there is a lot of misleading (and difficult to understand) documentation online, and I kept getting it to work and realising ALL users had access to ALL folders, or none. After some playing around, I found that for a basic site it's actually fairly easy to configure but thought I'd document this as it's useful as a basic file sharing mechanism. Note that you will need to ensure your site uses HTTPS rather than HTTP otherwise the password is sent in plain text across the network/internet/etc. Basic Auth isn't the most secure mechanism, but it's better than nothing at all.

Steps for configuration in IIS7:

1. Create your web site in IIS with a basic index.htm file as per any other site. Make sure Anonymous Authentication is Enabled at this level.
	![IIS_1!](../assets/img/2015/IIS_1.png "IIS_1.png")
2. User permissions are controlled using standard user accounts. Go to manage your computer and and add a new local user.
	![IIS_2!](../assets/img/2015/IIS_2.png "IIS_2.png")
3. In Windows, create the folder in your web site directory.
4. In IIS Manager, click on the folder, go to Authentication and make sure Anonymous Authentication is Disabled, and Basic Authentication is Enabled.
	![IIS_4.png!](../assets/img/2015/IIS_4.png.png "IIS_4.png.png")
5. On the folder, go to Directory Browsing and make sure it is Enabled.
	![IIS_5!](../assets/img/2015/IIS_5.png "IIS_5.png")
6. In Windows Explorer, go to the folder, and update the permissions so that the user you created has Read access to the folder. Make sure you remove any other accounts that are not relevant - for example the Users group on the local machine should NOT have access to the folder. Finally, you also need to ensure that the user of the Application Pool under which the web site runs has access to the folder. For example, if your App Pool runs under the Network Service account, this account must have access to the folder in question.
	![IIS_6!](../assets/img/2015/IIS_6.png "IIS_6.png")

And there you go, that's it - you should be able to access your new folder and get a challenge response that will only work for your new user!
