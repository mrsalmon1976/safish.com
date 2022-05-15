---
layout: post
title: Linux - Scripting automatic file transfers via FTP
date: 2003-04-08 00:00:02
tags: [linux]
published: true
---

You can FTP in script files as a scheduled tasks by doing the following:

Create the shell file that will be run by the cron job:

```shell
  echo "FTP process commencing"
  su <youruser> -c "ftp 192.1.2.2 < /home/youruser/prodftp.txt"
  echo "FTP process completed"
```
  
In the above file, the user must be a user that has been setup to automatically log into the FTP service on the remote machine 192.1.2.3 (see FTP: Automatic login under the Operating Systems/Linux category).

The text file /home/youruser/prodftp.txt will contain the actual FTP information, for example:

```shell
  cd backups
  ls
  binary
  prompt
  mdelete *.dmp
  ls
  mput *.dmp
  ls
  close
  exit
```

The prompt command is very important - it turns off the interactive prompting for moving multiple files.