---
layout: post
title: Encrypting cookies with ASP.NET
date: 2009-05-19 13:59:00
tags: [asp.net]
published: true
---

I hadn't noticed it before, but ASP.NET provides a really simple way to encrypt your cookies. Cryptography 
is a field best left to the experts, but for simple encryption purposes this method is perfectly adequate.

First off, you will need to add an entry to your machine/web.config:

```xml
<machineKey
	validationKey="AutoGenerate,IsolateApps"
	decryptionKey="AutoGenerate,IsolateApps"
	validation="SHA1" decryption="AES" />
```

You can then encrypt/decrypt as follows:

```csharp
// encryption
var ticket = new FormsAuthenticationTicket(2, "", DateTime.Now, DateTime.Now.AddMinutes(10), false, "mycookievalue");
var encryptedData = FormsAuthentication.Encrypt(ticket);

// decryption
string myValue = FormsAuthentication.Decrypt(encryptedData).UserData.ToString();
```