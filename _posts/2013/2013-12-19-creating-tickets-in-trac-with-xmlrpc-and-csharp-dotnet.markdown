---
layout: post
title: Creating tickets in Trac with XmlRpc and C# .NET
date: 2013-12-19 15:00:00
tags: [trac,c#]
published: true
---

Programmatically creating tickets in a Trac system using the recommended approach of XmlRpc is actually fairly straight-forward. The documentation and various sources were confusing to me at first, so I thought I would document the steps I went through to set it up. For me, I had a basic Trac instance on Windows set up, with the AccountManagerPlugin enabled.

1. Go here: http://trac-hacks.org/wiki/XmlRpcPlugin.
2. From the command-line, run the easy_install option that suits you, I ran `easy_install -Z -U http://trac-hacks.org/svn/xmlrpcplugin/trunk`
3. As per the link above, enable the plugin in trac.ini, and if you're using the AccountManagerPlugin, make sure you follow the instructions.
4. Fire up Trac - you should now have the XmlRpcPlugin running in Trac.
5. Go to the Admin section in Trac, and to Permissions. You will need to add the XML_RPC permission to the user account that requires it - in my case I added it to my own login for testing purposes:

![TracPermissions!](../assets/img/2013/TracPermissions.png "TracPermissions.png")

6. If you browse to your Trac instance /rpc (e.g. http://localhost:8000/rpc) you will see the full XmlRpc API, with all possible methods to implement.
7. Create a new Visual Studio project, and implement the methods you want. I just implemented two methods, CreateTicket and AddAttachment as follows (according to the example [shown here](http://trac-hacks.org/wiki/XmlRpcPlugin/DotNet)):

```csharp
    public struct TicketAttributes
    {
    }

    [XmlRpcUrl("http://localhost:8000/login/xmlrpc")]
    public interface TracXmlRpcProxy : IXmlRpcProxy
    {

        [XmlRpcMethod("ticket.create")]
        int CreateTicket(string summary, string description, TicketAttributes attributes, bool notify, DateTime when);

        [XmlRpcMethod("ticket.putAttachment")]
        string AddAttachment(int ticketId, string filename, string description, byte[] data, bool replace = true);
    }

    class Program
    {
        static void Main(string[] args)
        {
            TracXmlRpcProxy proxy;

            // Fill these in appropriately
            string user = "matt";
            string password = "password!";

            /// Create an instance of the Trac interface
            proxy = XmlRpcProxyGen.Create();

            // If desired, point this to your URL. If you do not do this,
            // it will use the one specified in the service declaration.
            // proxy.Url = "https://trac-rules.org/xmlrpc";

            // Attach your credentials
            proxy.Credentials = new System.Net.NetworkCredential(user, password);

            TicketAttributes attr;
            //attr.comment = "This is the comment that goes with the new page";
            int ticketId = proxy.CreateTicket("Xml Rpc Test", "This is an XML RPC Test", attr, false, DateTime.Now);

            byte[] fileData = File.ReadAllBytes("C:\Temp\test.jpg");
            proxy.KeepAlive = false;
            proxy.AddAttachment(ticketId, "test.jpg", "Test description", fileData, true);

            Console.WriteLine("Ticket ID: " + ticketId);
        }
    }```
	
One thing to note with the above is the proxy.KeepAlive = false: this HAS to be set before sending the attachment otherwise you get the following error: "The server committed a protocol violation. Section=ResponseStatusLine".