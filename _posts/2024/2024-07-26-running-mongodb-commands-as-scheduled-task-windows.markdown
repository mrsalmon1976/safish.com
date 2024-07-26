---
layout: post
title: Running MongoDb Commands as a Scheduled Task On Windows
date: 2024-07-26 08:15:00
tags: [mongodb]
published: true
---

To execute commands against a MongoDb database as a scheduled task is simple, and requires two files.  

Say, for example, I want to update the `Priority` property of all documents in a collection once a day.  Assuming your working folder is `C:\MongoDb\Temp`, create a `myscript.js` file with the following commands:

```javascript
db.getCollection('Workflows').update( {}, { $set : { "Priority" : 1 } }, true, true);
```

Then, create a `run.bat` file, which will execute the above script file:

```batch
@echo off
"C:\MongoDb\v4\bin\mongo.exe" -u useraccount -p yourpassword --authenticationDatabase admin YourDatabase < C:\MongoDb\Temp\myscript.js
```

You can then set up your scheduled task, making sure to set the action properties as follows:

![MongoDb Scheduled Task Action](../assets/img/2024/mongodb_scheduled_task.png)

Note that the starting folder must be set to the location of your script.