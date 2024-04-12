---
layout: post
title: Azure Networking Fundamentals
date: 2024-03-22 13:54:00
tags: [azure]
published: true
---

## VNets (Virtual Networks)

- A virtual network in which you can deploy your cloud resources
- Cloud resources such as VMs, App Services, Databases, etc, should be deployed in a vnet
- Logically separated from other virtual networks
- Resources in a VNet can communicate to each other by default, but not with resources in other VNets (both of these can be modified)
- In AWS it is called Virtual Private Cloud (VPC)
- VNets are free, but limited to 50 per subscription across all regions
- Scoped to a single region (cannot span multiple regions)
- Scope to a single subscription
- VNets can be connected via [Peering](https://learn.microsoft.com/en-us/azure/virtual-network/virtual-network-peering-overview) - more details on this below
- Segmented using subnets
- Protected using Network Security Groups (NSG) (which is defined on the subnets)
- From the outset, limit access to resources in the VNet
- Each VNet has its own IP address range - by default 65,536 addresses (`10.0.0.0/16` i.e. `10.0.0.0 - 10.0.255.255`)
  - dsdsd
- CIDR notation used for VNets (Useful calculator here: https://www.ipaddressguide.com/cidr)
- If you want to move a VM to a new VNet, you will have to delete the VM but retain the disk - you can then locate the disk under *Disks* in the portal, from which you can then create a new VM and specify the new VNet

## SubNets

- Logical segment in a VNet
- When a VNet is created in Azure, a subnet is created with it called *default*, with 251 available addresses (`10.0.0.0/24` i.e. `10.0.0.0 - 10.0.0.255`) - note that the other 5 addresses are reserved for Azure itself
- Shares a subset of the VNet's IP range
- Used as a logical group of resources in the VNet
- Resources ***must*** be placed in a subnet (cannot be placed directly in a VNet)
- By default, resources in a subnet can talk to resources in other subnets (in the same VNet) (again, can be customised)
- Each subnet gets a share of the parent VNet's IP range
- NEVER use the full range of the VNet in the subnet, as modifying later is very difficult!
- Subnets are free, but are limited to 3,000 per VNet

## Network Security Groups (NSG)

- Effectively a gatekeep for SubNets, sort of like a mini firewall
- Defines who can connect in and our of subnets
- Should be a standard part of subnet creation
- Free to use
- Security rules can be created that examines source/destination IP and Port and the protocol used (TCP/UDP), and determines whether the connection is allowed or denied - just like a firewall
- Each rule is assigned a priority - the lower the number, the higher the priority of the rule
- An NSG is automatically created and attached to every VM's network interface.  So for example, if you create a VM called `my-vm`, you will see a resource `my-vm-nsg` automatically created with it, that you can edit to lock down the security for that VM.
- It's important to note that VMs are created by default with the RDP port (3389) open to any source/destination over TCP - you should lock this down to your own IP address / range as soon as possible.
- An NSG is an independent resource that can be attached to multiple network interfaces e.g. to multiple subnets
- Rules can be created for IPs, but also for *Security Tags*, which represent well known sources such as Internet, AzureLoadBalancer, etc.  These should be used when your rule applies to built-in Azure resources.

## Network Peering

- Used when you have separate systems in completely different VNets (e.g. for security reasons, like a sensitive database that you don't want on the same VNet as your public-facing web server)
- Allows two VNets to connect to each other
- You must be sure that network addresses do not overlap
- Use NSG for protection
- Network Peering can span across regions (whereas a single VNet cannot)
- Is not free - you pay for bandwidth used


## Load Balancer

## Application Gateway

## Network Peering