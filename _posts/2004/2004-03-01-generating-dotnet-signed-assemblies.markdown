---
layout: post
title: Generating .NET Signed assemblies
date: 2004-03-01 00:00:00
tags: [.net]
published: true
---

To protect your assemblies, you can use the sn tool to generate a key file. This should then be referenced in any assembly info files in your 
project to ensure that third parties cannot use your assemblies unless you provide them with the key file.

This, however, causes a problem when using third party COM components, as the Interop assemblies are then not "strongly named". you can get 
around this by setting the following property of your project:

* Click Project..Properties
* Click General
* Enter the location of your key file in the "Wrapper Assembly Key File" property.

When your assembly is built, the interop assembly will then be constructed using your key file and you will not get security exceptions.