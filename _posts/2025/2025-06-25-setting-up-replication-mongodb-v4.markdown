---
layout: post
title: Setting up replication for MongoDb v4
date: 2025-07-14 15:51:00
tags: [mongodb]
published: true
---

This post is a reminder to myself for setting up replication for MongoDb for Disaster Recovery, as all the AI agents seemed to have this wrong and/or missed a number of steps.  This should work for versions 5 and 6 of MongoDb, but for the purposes of this article it was only done on v4.

Note that this is for replication for DR - with the deliberate decision to not set up the replicate set for high availability.  In this case, the replication secondary is intended for use only if the primary site fails - we don't want it assuming lead status if the original primary fails (or is rebooted!).

# Preparation

You will need:

- Two running instances of MongoDb
- Administrative access to both servers and MongoDb instances
- OpenSSL installed locally to generate a key file - I used the [Shining Light Productions version](https://slproweb.com/products/Win32OpenSSL.html) 
  - `winget install --Id=ShiningLight.OpenSSL.Dev`

# Generate a Key file

Before we start, we need a keyfile placed on each of the MongoDb servers - the running service will need read access to the file.

```bash
openssl rand -base64 756 > mongodb-keyfile
```

# Update Mongo Configuration

Add the following to your `mongodb.config` file (this is a YAML file) on BOTH servers:

```yaml
  replication:
  replSetName: rs0

security:
  authorization: enabled
  keyFile: C:\MongoDb\v4\mongodb-keyfile
```

Some important notes here:
 - When you restart your MongoDb instances after making these changes, they will be **inaccessible** until you fire up the replica set as per the next step
 - My keyfile is on Windows, for Linux you will need to apply permissions to the file and set a Linux path to the file.
 - It is also important ti note that YAML is very iffy with spacing and tabs.  Make sure all "empty" lines are really empty, and leading spaces are spaces and not tabs. Test this out before making your changes.
 
# Initialize the Replica Set

Restart MongoDb on both servers - no-one will be able to connect until the following steps are complete, so you need to be quick if this is a production environment.

On the **primary** instance, log into it via the shell

```bash
mongo --username admin --password password --authenticationDatabase "admin"
```

From the shell, initialise the replica set, switching out `PRIMARY-HOST` with your server's host name:

```js
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "PRIMARY-HOST:27017" }
  ]
});

```

Your **primary** server will now be open to connections, and you should be able to check the replication status:

```js
rs.status();
```

Now, we can initialise replication, switching `SECONDARY-HOST` with your secondary server name:

```js
rs.add("SECONDARY-HOST:27017");
```

# Remove High Availability

With the current configuration, if your **primary** fails, your secondary will automatically kick in.  For the purposes of this article, this is not what we want, so we need to remove this configuration.

Still connected to the mongo shell on the **primary** server, get the current config:

```js
cfg = rs.conf();
```

Set the secondary’s priority to 0.  You will need to work out where the secondary server is in the config members collection, although it will be at index 1 in this example of only two servers.  You can work it out by looking at `cfg.members[i].host`.

```js
cfg.members[1].priority = 0; 
```

Reapply the config:

```js
rs.reconfig(cfg);
```

Once this is complete:
 - All data will still be replicated from the primary to the secondary.
 - The secondary will never stand for election as primary.
That means if your primary reboots:
 - The secondary stays as secondary.
 - The replica set will be read-only until the primary is back.
 
# Monitoring 

The following commands can be used to monitor the status of replication:

## Status

This command can be run on both the primary and the secondary, and will show the status of replication.  The primary will have no `syncSourceHost` value, and the secondary will reflect the host name of the primary.  For MongoDb versions 5 and above, the `stateStr` property will have a value of `PRIMARY`.

```js
rs.status();
```

## Replication Info

This command can show replication info, including the last time an item was replicated:

```js
rs.printReplicationInfo();
```

This command will show you the lag between primary and secondary:

```js
rs.printSlaveReplicationInfo();
```

For MongoDb version 4 and below, this command can be used to determine which server is primary.  The property `ismaster` will reflect `true` and `secondary` will be `false` for the **primary** server, and obviously reversed on the secondary.

```js
db.isMaster();
```


