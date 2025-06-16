---
layout: post
title: Setting up a new machine with winget
date: 2025-06-13 07:30:00
tags: [windows,winget]
published: true
---

I got a new laptop for work, and decided to take the future pain out of setup using [WinGet](https://learn.microsoft.com/en-us/windows/package-manager/winget/).  WinGet comes 
baked into Windows version 24H2 and above, and is a convenient way to keep all your applications up to date.

WinGet does provide a command line search function, but with over 8,000 packages it can get a little difficult to find exactly what you want.  I use [winstall.app](https://winstall.app/) to make searching for apps a little easier.

This is the list of applications I install by default.  I use exact package name matching just to be sure I don't download something incorrectly.

```
winget install -id=Google.Chrome -e
winget install -id=Notepad++.Notepad++ -e
winget install -id=Git.Git -e
winget install -id=GitExtensionsTeam.GitExtensions -e
winget install -id=Meld.Meld -e
winget install -id=Mozilla.Firefox -e
winget install -id=dotPDN.PaintDotNet -e
winget install --id=Microsoft.VisualStudioCode -e
winget install --id=Microsoft.VisualStudio.2022.Professional -e
winget install --id Microsoft.SQLServerManagementStudio -e
winget install --id=mRemoteNG.mRemoteNG -e
winget install --id=3TSoftwareLabs.Robo3T -e
winget install --id=Notion.Notion -e
winget install --id=Postman.Postman -e
winget install --id=Mythicsoft.AgentRansack -e
winget install --id=Microsoft.WSL -e
winget install --id=Docker.DockerDesktop -e
winget install --id=JGraph.Draw -e
winget install --id=OBSProject.OBSStudio -e
winget install --id=Greenshot.Greenshot -e
winget install --id=Microsoft.AzureCLI -e
winget install --id=Microsoft.Azure.StorageExplorer -e
winget install --id=Microsoft.Azure.FunctionsCoreTools -e
winget install --id=OpenJS.NodeJS -e
```

Now I can keep all these applications up to date with all the latest security patches with one command:

```
winget upgrade --all
```
