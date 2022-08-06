---
layout: post
title: SQL Server Express Remote Connections
date: 2009-06-02 14:45:00
tags: [sqlserver]
published: true
---

I've been doing some work with SQL Server replication over the last few days, and in order to acheive 
this I was replicating between one of our DB servers and a SQL Server Express instance on my desktop. 
To my surprise, setting up remote connections to Express is actually a major pain in the butt, so I 
thought I'd document it here.

**Firewall**

The first step is to ensure that remote connections are allowed through your firewall. I was using 
the default Windows firewall, so I set up a new exception: I called it "SQL Server", Port number 1433, 
Protocol TCP, and I changed the scope to be "My network (subnet) only"

**SQL Server Configuration**

There are some hidden settings that you need to enable before SQL Server express will allow remote 
connections. You will need to load up the SQL Server Configuration Manager and do the following:

- Under SQL Server 2005 Network Configuration, mark the TCP/IP status as Enabled
- Right-click TCP/IP and go to Properties
- Go to the IP Addresses tab, and scroll down to IP All
- Remove the value in TCP Dynamic Ports, and enter "1433" (same value as you used in firewall) in the TCP Port value

**SQL Server**

The next step is to ensure SQL Server itself allows remote connections. From within SQL Server, go to the 
SQL Server instance, click Properties, Connections, "Allow remote connections to this server". Finally, 
restart the express service and you should be able to connect to your machine's SQL Server instance remotely.
