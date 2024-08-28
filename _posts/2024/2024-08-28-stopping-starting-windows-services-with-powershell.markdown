---
layout: post
title: Stopping and starting Windows services with Powershell
date: 2024-08-28 11:15:00
tags: [powershell]
published: true
---

This is a useful Powershell snippet for my future reference.  At my work, we install Windows services across multiple application servers, and these services are all named by convention with a common prefix.

Sometimes, for example if we need to reboot the database servers, it is useful to stop all the services so we don't get flooded with error alerts.

This script uses the naming convention to list all the services, and stop/start them depending on input from the user:

```powershell
$toggleAction = Read-Host -Prompt "Would you like to 'stop' or 'start' all MyCompany services?"
$toggleAction = $toggleAction.ToLower()
if ($toggleAction -ne "stop" -and $toggleAction -ne "start") 
{
    Write-Host "Invalid toggle action '$toggleAction'" -BackgroundColor Red
    Exit
}

$services = Get-Service
$toggleVerb = "Stopping"
if ($toggleAction -eq "start") { $toggleVerb = "Starting" }

foreach ($s in $services) 
{
    $serviceName = $s.Name
    if ($serviceName.StartsWith("MyCompany")) 
    {
        if ($serviceName -eq "MyCompany.ServiceWeDon'tWantToStop") 
        {
            Write-Host "Skipping service $serviceName - this service does not need to be stopped."
            continue
        }

        Write-Host "$toggleVerb service '$serviceName'..." -NoNewline
        try 
        {
            if ($toggleAction -eq "stop") 
            {
                Stop-Service -Name $serviceName -ErrorAction Stop -WarningAction SilentlyContinue
            }
            else 
            {
                Start-Service -Name $serviceName -ErrorAction Stop -WarningAction SilentlyContinue
            }
            Write-Host "success" -BackgroundColor Green -NoNewline
        }
        catch 
        {
            Write-Host "failed" -BackgroundColor Red -NoNewline
        }
        Write-Host "."
    }
}
```