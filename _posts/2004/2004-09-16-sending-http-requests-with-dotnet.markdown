---
layout: post
title: Sending HTTP Requests with .NET
date: 2004-09-16 00:00:00
tags: [asp.net, c#]
published: true
---

This code will send a web request via a proxy server and save it to a text file:

```csharp
byte[] buf = new byte[8192];
int count = 0;
// send the http request
HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://www.google.com");
NetworkCredential cred = new NetworkCredential("username", "password", "DOMAIN");
request.Proxy.Credentials = cred;
HttpWebResponse response = (HttpWebResponse)request.GetResponse();
Stream resStream = response.GetResponseStream();
// create the new text file
FileInfo f = new FileInfo("C:TempTest.txt");
f.Delete();
StreamWriter sw = f.CreateText();
// read contents of stream into text file
while ((count = resStream.Read(buf, 0, buf.Length)) > 0) {
	string s = Encoding.ASCII.GetString(buf, 0, count);
	sw.Write(s);
}
// close streams
sw.Close();
resStream.Close(); 
response.Close();
```

**Remote authorisation**

If your request requires remote authorisation, all you need to do is add the network credentials to the request, for example:

```csharp
request.Credentials = new NetworkCredential("username", "password");
```

**Handling response codes**

With the above method, anything other than a status of OK (200) will raise an error. If you want to check response codes, do the following:

```csharp
HttpStatusCode statusCode;
HttpWebResponse response = null;
try
{
	HttpWebRequest request = (HttpWebRequest)WebRequest.Create("http://localhost/default.asp");
	response = (HttpWebResponse)request.GetResponse();
	statusCode = response.StatusCode;
}
catch (WebException ex)
{
	statusCode = ((HttpWebResponse)ex.Response).StatusCode;
}
finally 
{
	if (response != null) response.Close();
}

if (statusCode != HttpStatusCode.OK) 
{
	throw new Exception("Error!");
}
```
