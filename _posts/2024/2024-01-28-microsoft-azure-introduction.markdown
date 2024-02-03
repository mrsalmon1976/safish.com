---
layout: post
title: A Microsoft Azure Introduction
date: 2024-01-28 09:17:00
tags: 
published: true
---

# Regions

Azure is spread across multiple **regions** ([https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies](https://azure.microsoft.com/en-us/explore/global-infrastructure/geographies)), where each region is a geographical area containing one or more data centers.

Within each region are **availability zones**, each of which is a physical data center with its own power, cooling, and network infrastructure.

Some regions have **paired regions** for increased availability: when a region fails, the paired region can take its place.

When selecting a region, you  will need to consider:
- Geographical proximity - you should always select a region closest to your target audience.
- Service availability - not all services are available in all regions
- Availability zones - if you have redundancy requirements, you need to consider regions that have availability zones
- Pricing - service prices can differ between regions (sometimes dramatically)

# Services

Services can be viewed at [https://azure.microsoft.com/en-us/products](https://azure.microsoft.com/en-us/products).

The Azure Portal is available at [https://portal.azure.com/](https://portal.azure.com/), where services can be managed.

# Portal Concepts

![Management Levels and Hierarchy](../assets/img/2024/azure-hierarchy.png)

Source: [https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources](https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/organize-resources)

### Accounts
- To use the Azure Portal, you will need to register an **Account**, which
- Refers to an Identity, that allows you to access resources linked with subscriptions
- Shows in the top right of the Azure portal
- Your account is attached to one or many Subscriptions

### Subscriptions
- Refers to a logical container
- Contains the resources you provision in the cloud (VMs, DBs, networks, etc.)
- Visible on the dashboard in the portal - each subscription has a unique name
- Effectively a cost center that your account is attached to
- You can create multiple subscriptions in your Azure account to create separation e.g. for billing or management purposes.
- Subscriptions can be attached to multiple accounts

### Management Groups
- can be used to manage multiple subscriptions, grouping them together.

### Resource Groups
- Used to group multiple resources together within a subscription
- Subscriptions can contain multiple resource groups.
- Effectively a container that holds related resources for an Azure solution.  
- Can contain all the resources, or a specific set of resources that you want to manage as a group.
- Examples: 
  - Development, Test and Production
  - Separating resources by Teams
  - Naming convention is to always name then `rg-xxxxxxxxx` (`rg` can be prefix or suffix).

### Resources

- An entity managed by Azure, e.g. VMs, DBs, Networks.  
- Resources can be created in the dashboard, although you will need to define resource groups for the resources to live in.  
- Almost every resource is placed within a Resource Group, as well as within a Subscription.

## Storage Account

- Special type of resource used to store almost anything, used transparently by almost anything in Azure
- Examples: Database backups, VM disks, Diagnostics data, Explicit data storage

# Cloud Shell

The Cloud Shell can be run in Azure via the portal or locally on your machine.  On first usage, you will need to mount storage and select which shell you want to use - Bash or Powershell (they have almost identical capabilities but different syntaxes).

Every command in the Bash shell begins with `az`.

You have a lot of power here, so for example if you want to create a new resource group in the South African North region, you could run the following command in Bash:

```bash
az group create -l southafricanorth -n test-rg
```

or in Powershell

```powershell
New-AzResourceGroup -Location southafricanorth -Name test-rg
```

**TIP:** A list of regions can be retrieved with the following command:

```bash
az account list-locations -o table
```

# SLAs

It is important to note that not all services have the same SLAs, so it is crucial that you check these before using a service.  SLAs can range from 99.995%, which translates to almost nothing in a year, to 99.9%, which allows for over 8 hours of downtime every year.  These are dependent on both the service and the service tier.

System SLAs are determined using a combination of the SLAs of the underlying services.  

Online tools do exist for calculating SLAs, for example [https://uptime.is/](https://uptime.is/).

# Cost

- Almost everything in the cloud has costs, with very few exceptions (e.g. resource groups).
- You can choose from a variety of pricing models:
  - Per resource e.g. by VM
  - Per consumption i.e. usage, e.g. Function apps
  - Reservations - pay upfront for the resources, committing to use it for a specific amount of time
- Always check the cost of resources before provisioning
- Look for reservations when available and relevant
- The Azure calculator should be used to calculate pricing ([https://azure.microsoft.com/en-gb/pricing/calculator/](https://azure.microsoft.com/en-gb/pricing/calculator/))
- Prices vary massively, depending on options picked.  For example, selecting the DTU purchase model as opposed to a vCore purchase model can make a huge difference for smaller use cases and proof of concept investigations.

# Budgets

- The **Cost Management** function within the Azure portal allows for smart budgeting in your Azure subscriptions
- Budgets can be set for a defined period and for a specific amount
- Alerts can be set up to warn you when a threshold is reached e.g. 90% of budget is reached before budget period ends
- This should be set up as soon as possible - it may reveal inefficient usage or overspend

# Architecting Cloud Solutions

Traditionally, architects needed to understand:
- non-functional requirements
- the technology stack
- component architecture
- communication patterns

However, when building cloud solutions, they will now also need to understand:
- aspects of infrastructure (networking, load balancing, firewalls, etc)
- security
- deployment and maintenance (traditionally done by the Infrastructrue team)


