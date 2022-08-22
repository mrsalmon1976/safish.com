---
layout: post
title: Installing Windows 10 Pro over Home Edition
date: 2018-02-26 08:15:00
tags: [windows]
published: true
---

I purchased a new laptop through work today, which came with a pre-installed version of Windows Home Edition. I need Professional Edition for work, and so bought a copy of Windows Pro at the same time. Because I'm iffy about setup, I elected to install the new OS myself...what a mistake. No matter what I did, the Windows installer kept pulling the key from the BIOS, and so kept activating as Windows Home.

Things I tried that failed:

1. Installing over Windows Home
2. Deleting all partitions, re-partitioning, formatting all drives, and installing from scratch
3. Swearing loudly, and reinstalling

Things I tried that worked:

1. Download the Windows 10 ISO from Microsoft - click "Download tool now" and create a USB drive installation media (alternatively, you can download the ISO and install to the drive)
2. I'm not 100% sure this step is necessary, but I did it anyway - create a "PID.txt" inside the "sources" folder file on your flash stick, with the following contents (where the XXXXX string is your valid Windows key)
	```
	[PID]
	Value=XXXXX-XXXXX-XXXXX-XXXXX-XXXXX
	```
3. In the sources folder again, create a text file called ei.cfg and set the contents to as follows:
	```
	[EditionID]
	Professional
	[Channel]
	OEM
	[VL]
	0
	```
	In the below articles, it was mentioned that this file should be placed in x64sources and x86sources directories - for me it was just the "sources" folder
4. Install Windows - I did this by just running the setup.exe file

I am documenting this here for my personal benefit, but this help as found here:

- [https://blogpirate.net/2014/02/22/bypass-the-uefis-windows-78-key-installation/](https://blogpirate.net/2014/02/22/bypass-the-uefis-windows-78-key-installation/)
- [https://www.experts-exchange.com/questions/29075574/Remove-windows-10-key-from-Bios.html](https://www.experts-exchange.com/questions/29075574/Remove-windows-10-key-from-Bios.html)


	
