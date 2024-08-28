---
layout: post
title: Detecting Windows servers needing a reboot with Powershell
date: 2024-08-28 11:21:00
tags: [powershell]
published: true
---

The below Powershell script can be used to get a list of Windows servers that need a reboot:

```powershell
cls
Import-Module ActiveDirectory

$servers = Get-ADComputer -Filter * -Properties operatingsystem | Where operatingsystem -match ‘server’ | Sort-Object Name
$path = 'HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager\PendingFileRenameOperations'
$name = 'PendingFileRenameOperations'


function CheckRebootStatus
{
    param ([object]$hostName)

    $session = $null
    try 
    {
        $session = New-PSSession -ComputerName $hostName -ErrorAction Stop
    }
    catch  
    {
        return New-Object -TypeName PSCustomObject -Property @{HostName=$hostName; Reason="Unable to connect"; RequiresReboot=$false; ExitCode=1}
    }

    $result = Invoke-Command -Session $session -ArgumentList @($hostName) -ScriptBlock {
        param($serverName)
        $requiresReboot = $false
        $reason = "No reboot required"
        if (Get-ChildItem "HKLM:\Software\Microsoft\Windows\CurrentVersion\Component Based Servicing\RebootPending" -EA Ignore) 
        { 
            $reason = "Component Based Servicing\RebootPending"
            $requiresReboot = $true 
        }
        elseif (Get-Item "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\WindowsUpdate\Auto Update\RebootRequired" -EA Ignore) 
        {
            $reason = "WindowsUpdate\Auto Update\RebootRequired" 
            $requiresReboot = $true 
        }
        if ($requiresReboot -eq $false) 
        {
            try 
            { 
                $util = [wmiclass]"\.\root\ccm\clientsdk:CCM_ClientUtilities"
                $status = $util.DetermineIfRebootPending()
                if (($status -ne $null) -and $status.RebootPending)
                {
                    $reason = "CCM_ClientUtilities.RebootPending"
                    $requiresReboot = $true 
                }
            }
            catch{}
        }

        if ($requiresReboot -eq $false -and (Get-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Control\Session Manager" -Name PendingFileRenameOperations -EA Ignore)) 
        {
            $reason = "PendingFileRenameOperations"
            $requiresReboot = $true 
        }

        return New-Object -TypeName PSCustomObject -Property @{HostName=$serverName; Reason=$reason; RequiresReboot=$requiresReboot; ExitCode=0}
    }

    return $result
}

function WriteLine
{
    param ([string]$server, [string]$reboot, [string]$reason, [System.ConsoleColor]$textColor, [char]$padChar=' ')
    
    Write-Host "| $server".PadRight(20, ' ') -NoNewline -ForegroundColor $textColor
    Write-Host " | " -NoNewLine -ForegroundColor $textColor
    Write-Host $reboot.PadRight(10, ' ') -NoNewline -ForegroundColor $textColor
    Write-Host " | $reason".PadRight(50, ' ') -NoNewline -ForegroundColor $textColor
    Write-Host " |" -ForegroundColor $textColor
}

function WriteResult
{
    param ([object]$rebootResult, [char]$padChar=' ')

    $server = $rebootResult.HostName 
    $reboot = "NO"
    $reason = $rebootResult.Reason
    $textColor = [System.ConsoleColor]::White

    if ($rebootResult.ExitCode -ne 0) 
    {
        $textColor = [System.ConsoleColor]::DarkGray
    }
    elseif ($rebootResult.RequiresReboot) 
    {
        $reboot = "YES"
        $textColor = [System.ConsoleColor]::Red
        if ($rebootResult.Reason -eq "PendingFileRenameOperations") 
        {
            $textColor = [System.ConsoleColor]::Yellow
        }
    }
    else 
    {
        $textColor = [System.ConsoleColor]::Green
    }
   

    WriteLine -server $server -reboot $reboot -reason $reason -textColor $textColor 
}

WriteLine -server "SERVER" -reboot "REBOOT" -reason "REASON" -textColor White -rebootColor White


foreach ($s in $servers) 
{
    $result = CheckRebootStatus -hostName $s.Name
    WriteResult -rebootResult $result
}
```

Running this script will give the following output:

![Servers needing a reboot](../assets/img/2024/powershell-server-reboot-output.png)

In the image, the colours are important:
 - Green means the server has no pending file updates and does not need to be rebooted
 - Grey means the server is not reachable
 - Red means the server has pending Windows updates, and needs a reboot
 - Yellow means the server has pending file rename changes - this could be caused by software and not necessarily by Windows updates, but its worth keeping on your radar