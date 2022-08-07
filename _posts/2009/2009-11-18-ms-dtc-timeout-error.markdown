---
layout: post
title: MS DTC Timeout error
date: 2009-11-18 08:46:00
tags: [sqlserver]
published: true
---

I had a very frustrating Friday evening fighting with MSDTC. I made a one-line, 10 second change to a page I was working on. It was one of those things that you really don't even need to test usually, but I always test, no matter how small the change, and 2.5 hours later I was still pulling my hair out. I just kept getting MSDTC timeout exceptions.

Now, this was a page that had been working literally hours before, with no other code changes. The ONLY difference I could think of, was that I had applied windows updates to my machine - but this turned out to be a red herring. The same page, with the same code, worked on a colleague's machine. I checked settings, triple checked settings, flushed my DNS cache, restarted my machine, all to no avail. Comment out the TransactionScope - it all worked fine, put it back in, boom!

Anyway, in case this happens to anyone else ever - this turned out to be a DNS issue on the SERVER. Logging into the server I could ping my machine by IP, but pinging by host name failed. Finally, I was getting somewhere. It turned out there was a dodgy DNS entry - flushing the DNS cache on the server worked and everything returned to normal. What a waste of 2.5 hours.
