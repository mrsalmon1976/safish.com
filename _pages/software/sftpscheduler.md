---
layout: page
title: SftpScheduler
permalink: /software/sftpscheduler
---

SftpScheduler is a web-based tool used to schedule SFTP jobs. It can be installed as a Windows service on a company server, and is accessed via a browser. Hosts and jobs can be configured with schedules, and if you have access to an SMTP server, notifications can be configured for repeated job failures.

This is useful if your company creates a large number of scheduled SFTP up/downloads.

Full details can be seen on GitHub: [https://github.com/mrsalmon1976/SftpScheduler](https://github.com/mrsalmon1976/SftpScheduler)

## Features

- Create a singular set of hosts
- Supports SFTP and FTPS
- Passwords are encrypted
- Flexible scheduling via CRON
- Create multiple upload jobs, monitoring local folders
- Create multiple download jobs, monitoring remote folders - download jobs can be configured to delete downloaded files, or move them into a remote archive path
- Option to copy downloaded files into additional local folders
- Zipping of files before upload
- Full history of downloads and job success
- Notifications for repeated failures, and configurable daily digest emails containing details of failing jobs from the past 24 hours (requires SMTP server)
- Configurable user list
- Audit logs of host and job changes

## Screenshots

![The SftpScheduler Dashboard!](https://github.com/mrsalmon1976/SftpScheduler/raw/main/img/screenshots/screenshot_dashboard.png?raw=true "SftpScheduler Dashboard")

![The SftpScheduler Jobs View!](https://github.com/mrsalmon1976/SftpScheduler/blob/main/img/screenshots/screenshot_jobs.png?raw=true "SftpScheduler Jobs")


<a href="https://github.com/mrsalmon1976/SftpScheduler/releases" class="main">Download the latest version</a>
