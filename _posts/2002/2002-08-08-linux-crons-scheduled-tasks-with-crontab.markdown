---
layout: post
title: Linux - Cron / Scheduled Tasks with crontab
date: 2002-08-08 00:00:00
tags: [linux,cron]
published: true
---

To add scheduled tasks, to a Linux machine, you need to use the crontab command. The following example works for Slackware 8 - it may be different on other versions of Linux.

=Create the scheduled task=

Locate the crontabs folder, usually located at /var/spool/cron/crontab. In the folder will be a text file with the same name as the currently logged in user. 
Open that text file in Joe/vi and add the following line to the file:

```
mm hh dd mm yy /folder/subfolder/yourfile
```

where mm is the minutes, hh is the hour etc. For example, if you want to run a php file every day at 14:00, you would add the folllowing to the file:

```
00 14 * * * /www/site/myfile.php
```

Run the command crontab filename to register the file.

**Note:** if there is only one line in the file, make sure you have a carriage return at the end of the file or it will fail.
**Note:** the file must be in Unix format
**Note:** if you set a scheduled task, for example, to a php file, be sure to add the interpreter directive to the top of the file, e.g.

```
#!/usr/sbin/php
```

=Delete the scheduled task=

Open up the text file and remove the appropriate line from the file. Execute the command crontab filename, for example to register the file.

Alternatively, running the command crontab -d will delete all cron jobs for the currently logged in user.