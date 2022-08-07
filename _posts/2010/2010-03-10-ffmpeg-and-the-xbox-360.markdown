---
layout: post
title: FFMPeg and the XBox 360
date: 2010-03-10 23:49:00
tags: [ffmpeg]
published: true
---

I've got a pile of old MPEGs on my PC from an old Sony camcorder of mine, that I wanted to play 
on my XBox 360. My XBox isn't connected to my home network, and I wanted to be able to convert 
the mpegs into something the XBox could read from an external drive.

I've been using [Handbrake](http://handbrake.fr/) to do conversions, and it works. Handbrake is an 
excellent piece of software, but it isn't quite what I need, as I wanted to do batch conversions 
and the HandbrakeCLI is a little clunky and too slow for what I want.

I've been trying for ages to convert the files to .mp4 with [ffmpeg](http://ffmpeg.org/), but the 
damn things just wouldn't play. I finally worked it out today. The mpegs have 5 channel Dolby 
audio - the XBox 360 doesn't support that. All I needed to do was restrict the audion channels 
to 2 on the output, and it worked! I haven't seen this anywhere on the web, so here goes:

```batch
ffmpeg.exe -i input.mpg -sameq -ac 2 -aspect 16:9 output.mp4
```

The `-sameq` tag forces the quality to be the same as the source. The `-aspect` is required for 
my files as the mpegs had a strange 2.34 aspect on them that made the resulting video play in a 
stretched mode (no idea why). The `-ac 2` was the piece I was missing - this restricts the audio 
channels to 2, and my mp4 files now work on my XBox (which, incidentally, has the optional media 
pack applied). So now, I can just batch convert all my files to .mp4 using FFMPeg, which is 
REALLY fast, and I'm done.