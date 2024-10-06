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
- Configuration is done on both sides (i.e. when creating a network peer you configure it from both directions and two peers will be created). Make sure configure your NSGs/VMs so only specific traffic is allowed (under Network Settings).

## Network Watcher

- Can be used to display your network topology to get a high level view of your environment
- Can also be used to troubleshoot connection issues (see *Connection troubleshoot* menu option)

## Securing VM Access

- Allowing general access via RDP is always a bad idea.  There are four techniques that can be used to secure VM access:
  - Just In Time (JIT) Access - open ports only when we need it, and then automatically close it.  Can be configured from the VMs page, but requires a Security Centre license upgrade.  This can be accessed from the VM in the portal, under the *Configuration* menu option, which has a "Just-in-time VM access" option.
  - VPN - allows for a secure tunnet to the VNet.  Requires VPN software and license, which are not part of Azure.
  - Jump Box - place another VM in the VNet and allow access to that VM only via one port only, and then access the other machines from that.  Obviously, this machine is still exposed on the Intranet, so you want to lock down access to this VM, preferably to a static IP address range.
  - [Bastion](https://azure.microsoft.com/en-us/products/azure-bastion#:~:text=Azure%20Bastion%20is%20a%20fully,exposure%20through%20public%20IP%20addresses.) - a web-based connection to the VM, with no open ports required.  It is simple, secure, and expensive ($140 per month).  Bastion also requires you have portal access (RDP does not).

# Securing App Services

- You are able to restrict traffic to app services, where by default, all inbound traffic is allowed
- Using access restrictions, you can limit inbound traffic to whitelisted IPs, VNets and Service Tags
- Examples:
  - Limit access to an App Service only to the Load Balancer or Application Gateway in front of it
  - Limit backend App Services that should only be accessed from the Front End App Service / VM
  - Limit an App Service to a specific whitelisted IP Range
- To apply access restrictions to App Services, navigate to the app service in the portal and
  - Go to "Networking"
  - Go to "Access restriction" under "Unbound Traffic"
  - Turn off "Allow public access" (if applicable)
  - Add a rule on the Main site

## Securing Services

- Many managed sevices (e.g. databases like SQL Server, MySql, CosmosDb) expose public IP addresses.  This can be protected with one of two methods:
  - [Service EndPoints](https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/service-endpoints-vs-private-endpoints/ba-p/3962134) - legacy solution that ensures that data never leaves the Azure backbone when your VMs/Apps communicate with the service.  Needs to be enabled on the Subnet from which you want to access the resource.
  -  [Private Links](https://learn.microsoft.com/en-us/azure/private-link/private-link-overview) - this is a newer solution which extends the managed service into the VNet, so traffic never leaves the VNet.  VMs talk to the App Service via private IP.  To use these, you must configure the resource to connecto the VNet, and you create a private link between the VM and the resource.  Most of the resources available support Private Links (more than Service Endpoints).  Private links are the preferred solution, but unfortunately are not free.
 - Use Hub ans Spoke network design - put each service in its own VNet

## Load Balancer

- This is an Azure service that distributes loads and checks the health of the underlying VMs (when a VM is unhealthy for more than a few seconds no traffic is directed to it)
- Load Balancer can work with VMs or with Scale Sets, and be public or private, operating at Layer 4 of the [OSI Model](https://learn.microsoft.com/en-us/windows-hardware/drivers/network/windows-network-architecture-and-the-osi-model)
- In terms of architecture, you could expose a web site hosted on multiple VMs via a public load balancer, and each of those web servers could connect to app services on a backend via a private internal load balancer
- The Azure Basic load balancer is free, but has no redundancy, no SLA, and is open by default.  For more security and a 99.99% SLA, you will need to pay for the Standard load balancer (which has other other benefits)
- Load Balancer cannot handle HTTP and doesn't route based on path or apply any protection - for web traffic you should rather use an Application Gateway

## Application Gateway

- Effectively a load balancer with HTTP and web capabilities (e.g. header/url rewrite, session affinity, SSL termination, URL based routing, Websockets, zone redundancy, custom error pages, WAF, etc)
- Works with VMs and VM Scale Sets, but also supports App Services and Kubernetes
- operates at layer 7 of the [OSI Model](https://learn.microsoft.com/en-us/windows-hardware/drivers/network/windows-network-architecture-and-the-osi-model), and so can inspect headers, URL, etc
- Usually placed in its own Subnet, and often in its own VNet - with backend resources to accessible from anywhere else
- Can also protect your Azure functions (function apps are basically App Services) - configure the functions in a Backend pool and configure access restrictions
- Enable cookie-based affinity to ensure the same user is always directed to the same backend VM or App service (although this obviously has load-balancing implications and should be avoided when possible - rather design a stateless application)
- One thing to be aware of is that cookies attached to responses in App Services behind an Application Gateway will have a different domain to the domain requested by the client (e.g. myapp.azurewebsites.net) - which will result in the browser discarding the cookie.  To solve this, you will need to set the custom domain for the app service to the same as that set on the Application Gateway (App Service / Custom domains on the Azure Portal)