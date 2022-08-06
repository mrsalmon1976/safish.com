---
layout: post
title: Using Microsoft's Performance Monitor Tool
date: 2009-05-20 15:24:00
tags: [perfmon]
published: true
---

Knowing how to use PerfMon can be absolutely critical when faced with unknown performance problems on large 
information systems. When you're faced with a performance bottleneck in a large server farm, it can be very 
difficult to track down issues as minor hiccups can have knock-on effects that are far more apparent to the 
user than the server experiencing the source of the error, as other servers in the chain sit waiting for 
the problem to be resolved. PerfMon can be used to track hundreds of performance issues, this article purely 
serves as an introduction on how to use the tool as it isn't apparent when you load it up.

When you run PerfMon, you can see current statistic and current counters running, but it doesn't provide an 
option to "Save". It doesn't quite work like most applications. In order to start your own log, you need to 
expand the "Performance Logs and Alerts" tree item, and then select either Counter Logs, Alerts, etc, 
depending on what you want to log. In the main display area, you can then right-click and create a new log.

If you are creating a Counter Log, you will see a log file name, and you will have the ability to add Objects 
or Counters to that log file. I usually select individual Counters rather than whole objects, so you can zone 
in onto the exact items you need to check.

One item to note is that by default, PerfMon will log to a binary file. You can change it to log directly 
to a .csv file or even to a database. However, if you do log to a binary file format, you can always use the 
command-line "relog" tool to convert it into other formats. For example, to convert to csv:

```batch
relog MyLogFile.blg -f csv MyLogFile.csv
```

Once you have finished setting logging options, the log is then saved on the machine. You can stop and start 
logging by right-clicking on the log and clicking Start/Stop. The settings can be exported and imported to/from 
html format, and you can adjust properties of the log.
