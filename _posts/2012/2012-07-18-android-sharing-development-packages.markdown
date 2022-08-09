---
layout: post
title: Android - Sharing development packages
date: 2012-07-18 18:15:00
tags: [android]
published: true
---

I was wondering how you can share Android packages that you're developing with other interested parties. Well, it turns out it's fairly easy. Assuming you're working on the emulator, your first task is to extract the package off the emulator.

Make sure the emulator is running i.e. you have executed your application via Eclipse. At the command prompt, you will need to navigate to wherever your android SDKs are installed on your machine, and go into the platform-tools. Here, type in

```shell
adb shell
```

This will allow you to determine the name of your package. Navigate (cd) into /data and then /app and "ls" - this will list the installed packages. Once you have that you can "exit".
The next step is to pull the package off the phone. Assuming your package name is "com.test.apk", issue the following command:

```shell
adb pull /data/app/com.test.apk
```

This will pull the .apk file onto your hard drive.
Next step: make the .apk available onto the internet. I dropped the file into a public [Dropbox](http://www.dropbox.com/) share. Now all you have to do is share the public link, and anyone with an android device can navigate to the .apk public link using the Android browser. It will download the file - from there all you need to do click it and it will install (or if a version is already installed, the existing version will be overwritten).

Incidentally, you can test this on the emulator itself, although you will need to enable internet access. To do this, in Eclipse:

1. Window -> Preferences -> Android -> Launch
2. Default emulator options: `-dns-server 8.8.8.8,8.8.4.4`