---
layout: post
title: Scheduled photos with a web cam
date: 2014-04-18 12:00:00
tags: [powershell]
published: true
---

I have a spare web cam lying around, and figured it would be a great addition to set it up so it can take regular photos of our lounge when we're away on holiday. I did a quick Google, and managed to get a rudimentary solution running in less than half an hour using [CommandCam](http://batchloaf.wordpress.com/commandcam/) and Powershell.

The solution was pretty basic: I downloaded the exe and then created a Powrshell script that captures an image every 5 minutes. I added an extra command to my script which sends me an email every now and then to remind me that the capture is still running. Basic, but it works! Note that this just runs forever, I'm happy with it working that way and I just stop it when I want to, although this could be altered to be a scheduled task or windows service.

```powershell
cd E:\Cam
$photo_count = 0

while ($true) {
    .\CommandCam.exe /quiet

    $dt = [System.DateTime]::Now.ToString("yyyyMMdd_HHmmss")
    Rename-Item image.bmp "image_$dt.bmp"
    Write-Output "image_$dt.bmp"

    $photo_count = $photo_count + 1
    if ($photo_count -gt 72) {
        $smtp = New-Object Net.Mail.SmtpClient("mysmtp.com", 101) 
        $smtp.EnableSsl = $true 
        $smtp.Credentials = New-Object System.Net.NetworkCredential("hello@nowhere.com", "password"); 
        $smtp.Send("fromaddress@somewhere.com", "toaddress@nowhere.com", "Web capture running", "Reminder: web capture is still running on SERVERX")    
        Write-Output "Reminder sent"
        $photo_count = 0
    }    
    # capture every 5 minutes
    Start-Sleep -s 300 
}
```

With my web cam, the resulting images are pretty small too - around 250-300KB each, so I went one step further and changed my target folder to a Dropbox folder, This means my images are automatically uploaded to the web too, so I can admire my empty lounge using my phone in a matter of seconds.....
