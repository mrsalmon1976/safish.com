---
layout: post
title: XmlWriter not releasing file with Powershell Script
date: 2015-01-07 13:23:00
tags: [powershell]
published: true
---

I encountered an issue today where a developer had created a Powershell script to write XML from stored procedure to a file, and the file would not be released until we closed the PowerGUI Script Editor (which is what we used to run the file). Even from the console it would take 10 seconds after the script completed before the file lock was released.

The solution was fairly simple - closing the XmlWriter doesn't automatically flush and release the underlying stream, you have to explicitly set this on the writer using an XmlWriterSettings object. Full solution below.

```powershell
#Setup connection string and sql to run
$server = "magma"
$db = "my_database"
$connectionString = "Data Source=$server; Integrated Security=True; Initial Catalog=$db"

$connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$command = "EXECUTE spTest";

$dateTimeStamp = [System.DateTime]::Now.ToString("yyyyMMddHHmm")
$filePath = "\\mypath\Extract_$dateTimeStamp.xml"       

try
{
    $connection.Open()
    $command = New-Object System.Data.SqlClient.SqlCommand($command, $connection)
    $command.CommandTimeout = 0
	
    $xmlReader = $command.ExecuteXmlReader()

    $xmlWriterSettings = New-Object System.Xml.XmlWriterSettings
    $xmlWriterSettings.CloseOutput = $true
    $xmlWriter =  ([System.Xml.XmlWriter]::Create($filePath, $xmlWriterSettings))
    
    $xmlWriter.WriteNode($xmlReader,$true)    
    $xmlWriter.Flush()
}
catch {
    $errorMessage = $_.Exception.Message
    $body = "Extract failed to run for the extract: $errorMessage"
    Send-MailMessage -To "me@test.co.za" -From "do-not-reply@test.co.za" -Subject "Oops" -Body $body -SmtpServer "MYEXCHSERVER"
}
finally
{
    $xmlWriter.Close()
    $xmlReader.Close()
    $connection.Close()
    
    $xmlWriter.Dispose()
    $xmlReader.Dispose()
    $connection.Dispose()

    $xmlWriter = $null
    $xmlReader = $null
    $connection = $null
}

Write-Output "DONE!"
```