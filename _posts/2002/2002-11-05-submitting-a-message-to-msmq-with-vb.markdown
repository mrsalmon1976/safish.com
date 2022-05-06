---
layout: post
title: Submitting a message to MSMQ using VB
date: 2002-11-05 00:00:06
tags: [vb,msmq]
published: true
---

For this code to run you need to add a reference to the **Microsoft Message Queue Object Library** - this will 
only be available on your machine if you add the Message Queue Windows component (can be added via Start/Remove Programs).

```vb
	' create message queue objects
    Dim objQueueInfo As New MSMQQueueInfo
    Dim objQueue As MSMQQueue
    Dim objMsg As New MSMQMessage
    Dim strQName As String
    
    ' create queue name
    strQName = "DIRECT=OS:MACHINEPrivate$queuename"
    
    ' set queue information settings
    objQueueInfo.FormatName = strQName
    objQueueInfo.Label = "Test Queue"
    
    ' create queue object from queue info
    Set objQueue = objQueueInfo.Open(MQ_SEND_ACCESS, MQ_DENY_NONE)
    
    ' create message with name and body text
    objMsg.Label = "Test Message"
    objMsg.Body = "message body here"
    
    ' send the message to the queue and clean up
    objMsg.send objQueue, MQ_SINGLE_MESSAGE
    objQueue.Close
    
    Set objQueueInfo = Nothing
    Set objQueue = Nothing
    Set objMsg = Nothing
```