---
layout: post
title: Using Powershell with REST
date: 2016-10-11 06:55:00
tags: [powershell]
published: true
---

I was doing some Web API testing for a client today, with a fairly complex scenario that required multiple permutations of data. I had requested each possible combination, which was provided to me as a pile of JSON files that were compliant with a REST service on our side. The problem now, though, was how do I automate sending these JSON files?

As usual, I turned to Powershell, and was pleasantly surprised to see that there is an existing "Invoke-RestMethod" commandlet already, making this a piece of cake! The only minor complications were that our service used a combination of IP Address validation and Basic Auth, and that we forced SSL usage - but these turned out to be no problem from a code perspective.

```powershell
cls
$dir = "C:\temp\20161010\MyJsonFiles"
$files = [System.IO.Directory]::EnumerateFiles($dir, "*.txt")
$url = "https://localhost:44300/api/client/endpoint"

# ignore certificates when debugging on localhost only - don't use this on live!!!
[System.Net.ServicePointManager]::ServerCertificateValidationCallback = {$true}

# set up user for basic auth
$user = 'test'
$pass = 'password'
$pair = "$($user):$($pass)"
$encodedCreds = [System.Convert]::ToBase64String([System.Text.Encoding]::ASCII.GetBytes($pair))
$basicAuthValue = "Basic $encodedCreds"
$headers = @{
    Authorization = $basicAuthValue
}

foreach ($f in $files)
{
	$body = [System.IO.File]::ReadAllText($f)
	Invoke-RestMethod -Uri $url -Body $body -Method Post -Headers $headers -ContentType "application/json"
}
```