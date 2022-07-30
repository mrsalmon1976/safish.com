---
layout: post
title: Create a zip file from powershell using 7zip
date: 2022-07-29 17:06:00
tags: [powershell,7zip]
published: true
---

This is for future me....as present me always forgets how to do this.

```shell
$fileSource = "C:\Temp\MyFile.txt"
$fileTarget = "C:\Temp\MyFile.zip"
& "C:\Program Files (x86)\7-Zip\7z.exe" -tzip a "$fileSource" "$fileTarget"
if ($LASTEXITCODE -ne 0) 
{ 
	Write-Output "Failed to zip $fileSource" 
	Throw "Failed to zip file $fileSource"
}
```