---
layout: page
title: Stateless WorkflowEngine
permalink: /software/statelessworkflowengine
---

Stateless.Workflow is a basic .NET workflow engine based on the awesome <a href="https://github.com/nblumhardt/stateless">stateless</a> State Machine. It works in the same 
fashion as Stateless, but provides a wrapper for moving between states with the extra features expected of a workflow engine, such a retry attempts, exception handling, delays between workflow steps, etc.  

The wrapper supports persistence of workflows to a data store, providing resilience for 
longer running processes. 

Full details can be seen on GitHub: <a href="https://github.com/mrsalmon1976/Stateless.WorkflowEngine">https://github.com/mrsalmon1976/Stateless.WorkflowEngine</a>

## Features

* Persistence to MongoDb or RavenDb
* Prioritisation of workflows
* Configurable retry attempts
* Workflow resumption date for delayed activities
* Web-based dashboard for workflow monitoring
* Workflow graph visualisation (from within the dashboard)


## Screenshot

<img src="{{ 'assets/img/software/screen_statelessworkflowengine.png' | relative_url }}" alt="Stateless.WorkflowEngine screenshot" />

<a href="https://github.com/mrsalmon1976/Stateless.WorkflowEngine/releases" class="main">Download the latest version</a>
