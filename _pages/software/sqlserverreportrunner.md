---
layout: page
title: SQL Server Report Runner
permalink: /software/sqlserverreportrunner
---

<p>
SqlServerReportRunner is a simple tool designed to run reports in a queue, which is useful when 
you have a large number of scheduled reports being run that access the same large tables which 
end up blocking each other and slowing the process down.  This allows you control the number of 
reports that run at the same time, and also gives a full log of what reports are being run and 
how long they take to run.  
</p>
<p>
Full details can be seen on GitHub: <a href="https://github.com/mrsalmon1976/SqlServerReportRunner">https://github.com/mrsalmon1976/SqlServerReportRunner</a>
</p>
<h4>Features</h4>

<ul type="square">
	<li> Reports can be scheduled as SQL, Stored Procedues or SSRS</li>
	<li> Full parameter list supported with XML mapping</li>
	<li> Outputs into delimited, CSV, or Excel</li>
</ul>
<br />
<h4>Screenshot</h4>
<p>
<img src="{{ 'assets/img/software/screen_sqlserverreportrunner.png' | relative_url }}" alt="SqlServerReportRunner screenshot" />
</p>
<br />
<a href="https://github.com/mrsalmon1976/SqlServerReportRunner/releases/latest" class="main">Download the latest version</a>
