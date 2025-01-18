---
layout: post
title: Azure Blob Storage and Messaging
date: 2024-03-12 14:48:00
tags: [azure]
published: true
---

Azure Blob Storage and message lie under the banner of Azure Storage.

## Azure Storage Types

 - Blobs - object store
 - Files - file shares for cloud and on-premise deployments
 - Queues - message queues
 - Tables - NoSql data store
 - Disks - storage volumes for Azure VMs

## Azure Blob Storage

Azure BLOB (Binary Large Object) storage is an object store which is designed for unstructured data. It is great for files, 
videos, large documents, etc, and is the most cost-effective way to store files.  

Note that it is not a traditional file system - __Azure Files__ is better when you need to access data like a traditional file 
system with features like file sharing and random access, and is better suited for applications that do frequent updates to 
individual files. Generally, BLOB storage is best for  programmatic access to large data sets, while Azure Files are better for 
mounting as a network drive and accessing files like you would on a local machine. 

Azure Blob storage is generally cheaper than Azure File storage, especially when storing large volumes of data. 

Azure Blobs usage: Backup data, media streaming, analytics data, large-scale data processing, archiving. 
Azure Files usage: Shared home directories, application data, database backups, migrating on-premises file servers. 

Structure: Account &#x2192; Containers &#x2192; Blobs

## Messaging

There are four messaging options with Azure:

1. Storage queue
   - Simplest queue - basic send/receive messages
   - pricing included in Storage account pricing (no additional cost)
   - performance - 20K msgs/sec/account OR - 2k msgs/sec/queue
   - max msg size 64KB
   - Structure: Storage Account &#x2192; Queues &#x2192; Messages
2. Event Grid
   - Allows building event-based architectures (Pub/Sub)   
   - No queue and no order i.e. messages may not be received in the order sent
   - Cost effective, simple pricing
   - HA is built in
   - max msg size of 1MB
   - Architecture: Event sources which raise events (handled by Event Grid), and event handlers which receive messages on the topics they subscribe to
3. Service Bus
   - Full blown message queue service built into Azure, with three tiers (Basic, Standard and Premium)
   - Very durable
   - Supports queue or pub/sub scenarios (i.e. anything that Storage queue and Event Grid can do), depending on tier used
   - Compatible with AMQP protocol for IOT devices
   - Has advanced featues like FIFO, dead-letter queues, scheduled delivery, duplicate detection, and more
   - 99.99% SLA
   - Max msg size of 256KB
   - Architecture: Dependent on implemntation and tier
4. Event Hubs
   - Big data streaming and event ingestion
   - This is not a streaming service, it is effectively a managed Kafka implementation
   - Can receive millions of events per second, so is great for high load systems
   - Low latency, designed for heavy load
   - max msg size of 1MB
   - Architecture: 
      - Event Producer - Generates events using a client 
      - Event Hub Partitions - Similar to the concept of a topic or a single queue, where order is guranteed. However, a single partition has limited availability so it can be a better choice to spread messages across partitions to improve availability - but then you do lose control of the order of messages.  You can have most 32 partitions on a single event hub.
      - Consumer Group - logical group of event receivers that belong to the same application.  
   - Event receiving is done via the AMQP protocol
   
   


