---
layout: post
title: BluetoothHeadsetProxy.exe and killing multiple processes in Windows 7
date: 2012-04-11 07:56:00
tags: []
published: true
---

My machine was dying a miserable death today, as it has done often lately, and it was all down to a bug between Bluetooth software and Skype. What I noticed is literally hundreds of the same process "BluetoothHeadsetProxy.exe", with a new one spawning every few seconds.

My first problem was working out how to kill all the processes in one go - this turned out to be very simple, using the following command:

```batch
taskkill /F /IM BluetoothHeadsetProxy.exe
```

The next problem was working out why the processes were starting up, and I [found the answer on StackExchange](http://superuser.com/questions/239276/lots-of-bluetoothheadsetproxy-exe-processes) as usual.

To get rid of the problem:

1. Go to Tools -> Options -> Advanced
2. Click on the link at the bottom that says 'Manage other programs access to Skype', and remove all bluetooth software there
3. Shut down Skype
4. Run the command mentioned above from the command line to kill any processes that are hanging around, and restart Skype.
5. When Skype asks you to connect with bluetooth software, click on Deny.