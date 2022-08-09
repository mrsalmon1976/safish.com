---
layout: post
title: WCF Quick and Dirty
date: 2011-01-27 12:24:00
tags: [wcf]
published: true
---

I added some WCF services to an existing project today, and I found I had completely forgotten the easy 
way of setting this stuff up.  So, here goes.  Note that you will usually split your host and consumer 
between separate projects – this is just an outline of the basics when working with Visual Studio 2010 
and isn't really concerned with actual implementation.

**Create the DataContract Classes**

These are the classes that will be serialized and submitted by WCF.  For example, if you are creating 
a service to add two numbers, you would have a class like so:

```csharp
[DataContract] 
public class ExampleDataContract 
{ 
 [DataMember] 
 public int Num1 { get; set; } 

 [DataMember] 
 public int Num2 { get; set; } 
} 
```

**Create the Service**

Now that we have the data contract, we can create the actual service. 

1. Navigate to the location in your solution where the service will sit, and add a new item (a WCF Data Service).
2. The service is now created.  The interface should be decorated with a ServiceContract attribute.
3. Any methods added to the interface will need to be decorated with an OperationContract attribute.
4. In terms of the contract implementation, you will need to decorate your class with a ServiceBehavior attribute.  For example:
	```csharp
	[ServiceBehavior(InstanceContextMode = InstanceContextMode.PerCall, AddressFilterMode = AddressFilterMode.Any)]
	```
**Configure the Service**

You can manually configure your service in your App.config file, but there is actually a GUI that makes 
this a lot easier.  All you need to do is right-click your config file and there will be an option to 
Edit WCF Configuration – click this to launch the editor.

Note that if your project is not a WCF project, this may not be available in the context menu.  There's an easy work-around for this though:

1. Select _Tools->WCF Configuration Editor_ from the Visual Studio menu, and click WCF Configuration Editor
2. Close the WCF Configuration Editor

Now when you right-click the App.config the Edit WCF Configuration option should be available.

Usually there shouldn't be too much to change here unless you're manually creating your endpoints/services.  If you're just wanting the basic endpoints, you can give the endpoints names (e.g. AddNumbersHttp for the wsHttpBinding) and continue.

We now have enough set up to host and test the service.

**Test the Service**

Visual Studio 2010 makes testing WCF apps really simple.  If you're working with a WCF project, when you run the project Visual Studio will fire up the WCF test client by itself.

If you're developing a web project, this won't work, so you will need to fire up the client manually by opening a Visual Studio Command Prompt and typing the following:

`wcftestclient http://yoursite/Services/YourService.svc`

If you get errors here, you may need to configure your web site.  There are two possible issues:

1. IIS has not been configured to handle the .svc extension.  This is easily fixed by running the registration tool that comes with .NET – run ServiceModelReg.exe -i from the "%windir%Microsoft.NETFrameworkv3.0Windows Communication Foundation" directory
2. If you are getting an error that the service cannot be activated because it does not support ASP.NET compatibility you can either configure your application for compatibility mode, or mark your service implementation with the following attribute:
	```csharp
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
	```

**Create the Client**

You can now create the client that will consume the services created above. 

1. Right-click your project's References, and click Add Service Reference
2. If you want to use a service within another project in your solution, you can click the Discover button and select Services in Solution
3. Select the service, and enter a namespace that will be used within the client project to refer to the service
4. You can now use the service like any other C# class, for example:

```csharp
MyServiceNamespace.MyServiceClient client = new MyServiceNamespace.MyServiceClient();
client.AddNumbers(1, 2);
client.Close();
```

**Resources** 

1. http://msdn.microsoft.com/en-us/netframework/dd939784
2. http://channel9.msdn.com/shows/Endpoint/Endpoint-Screencasts-Creating-Your-First-WCF-Service/
