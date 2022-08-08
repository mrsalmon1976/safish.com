---
layout: post
title: Getting the Host Key Fingerprint for SFTP Connections
date: 2022-08-08 09:35:00
future: true
tags: [sftp,winscp]
published: true
---

When scripting SFTP jobs, it's a good idea to include the host key fingerprint to prevent man 
in the middle attacks. The easiest way I have found to get this information (if not provided) is 
to use [WinSCP](https://winscp.net/eng/index.php).

Run WinSCP.exe, and create a new connection.  When you connect, you will be prompted with host key 
information to add to the cache - with a very convenient option to "Copy key fingerprints to 
clipboard", per below screenshot.

![WINSCP Host Key Fingerprint!](../assets/img/2022/WinSCP_KeyFingerPrint.png "WinSCP_KeyFingerPrint.png")