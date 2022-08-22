---
layout: post
title: Powershell Tips using Jenkins
date: 2019-04-10 07:13:00
tags: [powershell,jenkins]
published: true
---

At [IUA](https://www.iua.co.za/) we use [Jenkins](https://jenkins.io/) for CI, and we use Powershell for automation of our builds and deployments. We've always invoked Powershell using batch commands, but I recent implemented the [Powershell plugin](https://plugins.jenkins.io/powershell) which makes life a little easier. Some tips on implementation:

# Include a file

Prefix the file name with a ". "

```powershell
. C:\Temp\test.ps1
```

# Use environment variables

When running in the context of Jenkins, you can get and set environment variables. This can be useful when wanting to access a common function used across multiple scripts. For example, if you have many files wanting to use a version number, but the generation of that version number is complex enough to put it in a function, you could move that function to a common file and then store the generated value in an environment variable:

```powershell
. C:\Temp\version.ps1
$env:version = GetVersion
Write-Host $env:version
```

# Run jobs via the Jenkins API

I got this code from [Stack overflow](https://stackoverflow.com/questions/46131903/why-is-powershell-not-able-to-send-proper-crumb), but adapted it to include build parameters:

```powershell
function RunJenkinsJob
{
    param(
        [string]$userName,
        [string]$password,
        [string]$apiUrl,
        [string]$apiPort,
        [string]$jobName,
        [string]$jobParams      # url-encoded string of parameters e.g. myparam1=val1&myparam2=anotherval
    )

    $h = @{}
    $h.Add('Authorization', 'Basic ' + [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("$(${userName}):$(${password})")))

    $params = @{uri = "${apiUrl}:${apiPort}/crumbIssuer/api/json";
            Method = 'Get';
            Headers = $h;}
    $apiCrumb = Invoke-RestMethod @params

    $uri = "${apiUrl}:${apiPort}/job/${jobName}"
    if ([String]::IsNullOrWhiteSpace($jobParams)) {
        $uri = "$uri/build"
    }
    else {
        $uri = "$uri/buildWithParameters?$jobParams"
    }

    $h.Add('Jenkins-Crumb', $apiCrumb.crumb)
    $params['uri'] = $uri
    $params['Method'] = 'Post'
    $params['Headers'] = $h

    Invoke-RestMethod @params

}

RunJenkinsJob -userName "jenkins" -password "mypassword" -apiUrl "http://buildserver" -apiPort "8080" -jobName "JobWithParams" -jobParams "PARAM1=value1&PARAM2=value2"
RunJenkinsJob -userName "jenkins" -password "mypassword" -apiUrl "http://buildserver" -apiPort "8080" -jobName "JobWithoutParams" 
```