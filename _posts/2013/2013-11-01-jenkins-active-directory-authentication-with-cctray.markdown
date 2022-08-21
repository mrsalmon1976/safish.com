---
layout: post
title: Jenkins Active Directory Authentication with CCTray
date: 2013-11-01 15:29:00
tags: [jenkins]
published: true
---

Our Jenkins build server is only accessed internally, so there was never any real reason to put authentication on it. However, I recently added QA Deployments to the build server and we'd like to implement production releases too, so I figured now was a good time to add Active Directory authentication.

Adding authentication was easy: Add the [Active Directory plugin](https://wiki.jenkins-ci.org/display/JENKINS/Active+Directory+plugin), activate it using Global Security, and add the users who you want to be able to login. That took about 2 minutes. The problem for me was that we use CCTray for local build monitoring, and CCTray was now longer working.

I found a solution fairly quickly, but it's implementation wasn't completely straight-forward, so I thought I would document it here. This assumes that you have CCTray 1.8.0 or above installed.

1. Visit [https://github.com/csnate/cctray-jenkins-transport](https://github.com/csnate/cctray-jenkins-transport), and download the zip file. Build the project (I built in Release mode), and then copy all the files compiled into the bin folder into an "extensions" folder.
2. Close down CCTray, and copy the "extensions" folder into your local CCTray folder (usually located at C:Program Files (x86)CCTray)
3. Run CCTray
4. Open the Settings... view off CCTray, and add a new server as follows:
	- Click "Using a transport extension"
	- Select "JenkinsTransport" from the drop-down box
	- Click Configure Extension
	- Server: Your server - eg. http://myserver:8080
	- Username: Your current network user name
	- Password: Your current network password