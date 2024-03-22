---
layout: post
title: Azure Compute - Functions Overview
date: 2024-03-21 19:54:00
tags: [azure]
published: true
---

## Triggers and Bindings

**Triggers** define the event that makes the function execute
  - Azure functions can subscribe to a number of trigger types, e.g. HTTP Requests, CosmosDB, Timers, Kafka, Service Bus, RabbitMQ, Event Grid, etc

**Bindings** are a declarative connection to other resource in the cloud, allowing you to read/write from/to other resources 
  - These are provided as a parameter to the function
  - Not all functions have a binding e.g. HTTP requests return a value but don't connect to any other Azure resources
  - Like triggers, there is a long list of potential bindings, e.g. HTTP Requests, Cosmos DB, Dapr, Kafka, RabbitMQ, Service Bus, SignalR, Table Storage, Mobile Apps, etc.
  
  **Examples**
  - A function that runs on a timer (trigger) and aggregates data in a database (binding)
  - A function that executes when a storage queue message arrives (trigger), and saves the message to CosmosDB (binding)
  - A function that executes when a service bus message arrives (trigger), and sends an event to EventGrid (binding)
  - Receive an HTTP request (trigger) and return a calculated value (no binding)

## Cold Starts

Although functions are "serverless" from the user perspective, they are of course still running on a host in the Azure environment.  This means that functions that are not used frequently may live on an idle host which may be taken down by Azure if it is not using 
any compute power.  The next activation of the function may therefore be slow - it could be 
2 - 3 seconds before the code executes.

This may not be an issue with asynchronous triggers (e.g. queue reactions), but will be an issue with HTTP request triggers.  Cold starts are only a problem with the *Consumption* hosting plan, but this is the most commonly selected plan.

## Azure Functions Hosting Plans

- **Consumption**
  - Pay only for what you use: execution time (measured in terms of RAM used) and number of executions
  - Has a limit of 1.56GB of RAM
  - Cold starts are applicable 
- **Premium**
  - Pay for pre-warmed instances (hosts)
  - You will select a specific instance size that will affect the pricing
  - Can pay for scale-out instances
  - No cold starts
  - Memory is limited to the host selected
  - Better performance
  - VNet integration
  - Predictable price
- **Dedicated**
  - Functions run on an existing App Service
  - Works well on under-utilized servers that you are already paying for
  - "Always On" setting should be activated to avoid disabling the function
  - No Auto-Scale

## Durable Functions

- Stateful functions implementing the `IDurableOrchestrationContext` interfact that interact with external resources and keep track of flow
- Very simple syntax and hide the complexities of managing state, retries, etc
- Very useful for function chaining (functions calling each other in sequence)

