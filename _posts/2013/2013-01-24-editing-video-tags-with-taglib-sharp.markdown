---
layout: post
title: Editing Video Tags with taglib-sharp
date: 2013-01-24 20:12:00
tags: [C#]
published: true
---

I've been using XBMC at home, and I've been trying to find software to edit Genres on my movie files so I can sort them a little better. 
To my surprise, I couldn't find anything that seems to be able to edit tags on all the file types that I used. My next step was looking 
for libraries, and I was pleasantly surprised with taglib-sharp - available at [https://github.com/mono/taglib-sharp](https://github.com/mono/taglib-sharp).

I installed using the Nuget Package Manager in Visual Studio, and it literally took me 2 minutes to figure out a basic example and it worked perfectly on a number of files I tried!

```csharp
using (TagLib.File tagFile = TagLib.File.Create("D:\\Temp\\101 Dalmatians.avi"))
{
    tagFile.Tag.Genres = new string[] { "Animated", "Family" };
    tagFile.Save();
}
```

I love software that just works.