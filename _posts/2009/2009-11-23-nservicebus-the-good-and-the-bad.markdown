---
layout: post
title: nServiceBus - The Good and the Bad
date: 2009-11-23 12:56:00
tags: [nservicebus]
published: true
---

We've been using [nServiceBus](http://www.nservicebus.com/) at work for the last week or two to send 
messages between a client and server in a (hopefully) robust fashion.

As a tool, I really like nServiceBus. Once you have it up and running, the use of MSMQ is just brilliant - 
force a crash in your application and when you start up again they're just there still, ready to be 
processed - right out the box. Wrap them in a transaction (MSMQ supports MSDTC) and anything goes wrong, 
the sending of the message gets rolled back. Awesome stuff - it's definitely something I will use again.

But that's not the point of this post. I'm going to point out all the BAD stuff - in the hope that someone else doesn't have the same fights I did. Let me say upfront that I recommend using it - just be aware that the document isn't just bad, it's DISMAL. The author seems to assume that we all understand how the bus works and how to use it - methods are undocumented and even the documentation on how to get it up and running is hopelessly inadequate. So, here goes.

**Configuration**

The nServiceBus site does have some documentation regarding publish/subscribe scenarios at 
[http://www.nservicebus.com/PubSubApiAndConfiguration.aspx](http://www.nservicebus.com/PubSubApiAndConfiguration.aspx). 
However, the way it's worded just didn't make sense to me, and it was [Rohland](http://www.rohland.co.za/) who finally worked out what the hell they mean.

_Exhibit A_

```xml
<MsmqTransportConfig
    InputQueue="myqueue"
    ErrorQueue="errors"
    NumberOfWorkerThreads="1"
    MaxRetries="5"
  />
```

The above configuration specifies the INPUT to your assembly's message handler. In this example, the application using 
this configuration will listen for messages on the MSMQ "myqueue" on the local machine. It will NOT place messages on 
that queue - this is the queue it will pick messages up from.

_Exhibit B_

```xml
<UnicastBusConfig DistributorControlAddress="" DistributorDataAddress="">
  <MessageEndpointMappings>
    <add Messages="My.Messages" Endpoint="somequeue" />
  </MessageEndpointMappings>
</UnicastBusConfig>
```

This configuration specifies where your application will publish messages TO! In this example, any messages in 
the "My.Messages" assembly will be placed on the "somequeue" MSMQ on the local machine. You can specify message 
types instead of assemblies if you want to. I quite like this - it makes it very easy to publish different messages 
to different queues, and it's all configurable. Also note that the end point doesn't have to be local - you can 
specify remote machines as per the nServiceBus documentation.

**Message Handlers**

In order to receive messages, your assembly that handles those messages needs to incorporate a message handler 
class, with support for the message types you want to receive. For example, if you want to subscribe to message 
types "A" and B", you can create a message handler like so:

```csharp
public class MessageHandler : IMessageHandler<A>, IMessageHandler<B>
{
    public void Handle(A message)
    {
        // handle messages of type A
    }

    public void Handle(B message)
    {
        // handle messages of type B
    }

}
```

You don't hook this class up anywhere - nServiceBus will find it and instantiate it. I don't like that. It makes it really easy to make mistakes - make a typo on your namespace and your event handler is never invoked, and you sit there scratching your head wondering why until you finally realise your config is fine, and your typing sucks. Another downer is that this is running on a separate thread to your application, so you need to invoke a delegate on appplication's main thread to handle the code, which can be a little iffy in forms development - you need to write code like the following to get a handle on the form that you want to use, like so:

```csharp
FormMain fm = FormMain.GetInstance();
fm.Invoke(fm.AddInboundMessageHandler, message);
```

**Enumerations and/or More Complex Data Structures**

One problem I found, when using version 1.9, was when sending an enumeration of custom objects via a message. My message class contained an array of custom objects, which themselves had two properties: a string property and a byte array property. Nothing complex here. However, when I picked up the message on the subscriber, the collection was there, with the correct number, but the properties of the objects in the array were always null. I just couldn't get this to work at all. Converting the array to a dictionary was even worse - I got exceptions from nServiceBus, which seemed to fall over on some rather dodgy reflection code.

One thing I did find out is that your sub-entities do need to have a default, parameterless constructor, which makes sense as nServiceBus needs to recreate the serialized objects from the queue on the other end. However, try as I might, I never got this working on 1.9. Upgrading to version 2.0, however, and it all started working. I did try converting my array into a typed list for convenience, but this didn't work off the bat and wasn't that important to me so I reverted back to an array.

That's all I can think of for now - I'm sure I'll update this post in the future.

**References**

When I started looking at this there was NOTHING out there - but people are certainly using it. Her are some decent articles on nServiceBus:

- [http://mookid.dk/oncode/](http://mookid.dk/oncode/)
