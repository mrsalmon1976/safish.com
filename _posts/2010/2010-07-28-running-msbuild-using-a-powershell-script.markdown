---
layout: post
title: Running MSBuild using a Powershell Script
date: 2010-07-28 15:58:00
tags: [msbuild,powershell]
published: true
---

I wanted to build a Visual Studio solution using MSBuild using a Powershell script. Surprisingly, I couldn't 
find a reference on the web that actually worked for me. I thought I'd post it here for future reference, as 
it applies to the execution of any executable from within Powershell. It was "Invoke-Expression" that I hadn't used before.

```shell
$baseDir = "C:\Test"
$outputFolder = $baseDir + "Output"
$msbuild = "C:\Windows\Microsoft.NET\Framework64\v3.5\MSBuild.exe"
$options = "/noconsolelogger /p:Configuration=Release"
$releaseFolder = $baseDir + "MyProject\bin\Release"

# if the output folder exists, delete it
if ([System.IO.Directory]::Exists($outputFolder))
{
 [System.IO.Directory]::Delete($outputFolder, 1)
}

# make sure our working directory is correct
cd $baseDir

# create the build command and invoke it 
# note that if you want to debug, remove the "/noconsolelogger" 
# from the $options string
$clean = $msbuild + " ""MySolution.sln"" " + $options + " /t:Clean"
$build = $msbuild + " ""MySolution.sln"" " + $options + " /t:Build"
Invoke-Expression $clean
Invoke-Expression $build

# move all the files that were built to the output folder
[System.IO.Directory]::Move($releaseFolder, $outputFolder)
```