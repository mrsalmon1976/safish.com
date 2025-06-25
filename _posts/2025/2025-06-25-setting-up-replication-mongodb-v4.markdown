---
layout: post
title: Setting up replication for MongoDb v4
date: 2025-06-25 16:51:00
tags: [mongodb]
published: true
---

This post is a reminder to myself for setting up replication for MongoDb, as all the AI agents seemed to have this wrong and/or missed a number of steps.  This should work for versions 5 and 6 of MongoDb, but for the purposes of this article it was only done on v4.

# Preparation

You will need:

- Two running instances of MongoDb
- Administrative access to both servers and MongoDb instances
- OpenSSL installed locally to generate a key file (I used the [Shining Light Productions version](https://slproweb.com/products/Win32OpenSSL.html) - `winget install --Id=ShiningLight.OpenSSL.Dev`)

# Generate a Key file

Before we start, we need a keyfile placed on each of the MongoDb servers - the running service will need read access to the file.

```bash
openssl rand -base64 756 > mongodb-keyfile
```

# Update Mongo Configuration

Add the following to your `mongodb.config` file (this is a YAML file):

```yaml
  replication:
  replSetName: rs0

security:
  authorization: enabled
  keyFile: C:\MongoDb\v4\mongodb-keyfile
```

My keyfile is on Windows, for Linux you will need to apply permissions to the file and set a Linux path to the file.

It is also important note that YAML is very iffy with spacing and tabs.  Make sure all "empty" lines are really empty, and leading spaces are spaces and not tabs. 

Do this on the secondary server first to make sure your service starts cleanly, and then do it on the primary server.



