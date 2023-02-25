---
layout: page
title: IISLogReader
permalink: /software/iislogreader
---

IISLogReader is a simple, web-based application that can be used to analyse Internet Information Services (IIS) log files. Its primary use is for inspecting average page response times, but it can be used to look for errors and various other statistics. The application runs as a NancyFx dashboard i.e. it can be installed as a service and accessed with a web browser.

Full details can be seen on GitHub: <a href="https://github.com/mrsalmon1976/IISLogReader">https://github.com/mrsalmon1976/IISLogReader</a>

## Features

* Windows service with web interface (can be installed on a server)
* Log files can be grouped into different projects (usually per web application)
* Upload and storage of log files using a SQLite database
* URLs grouped by request count and average time taken (in milliseconds)
* URL aggregation - use regular expressions to group parameterised URLs
* Configurable user access

## Screenshot

<img src="{{ 'assets/img/software/screen_iislogreader.png' | relative_url }}" alt="IIS Log Reader screenshot" />

<a href="https://github.com/mrsalmon1976/IISLogReader/releases" class="main">Download the latest version</a>
