---
layout: post
title: Assigning custom application roles in Entra Admin Center
date: 2024-09-05 08:03:00
tags: [azure]
published: true
---

I find the [Entra admin center](https://entra.microsoft.com/) completely unintuitive when it comes to assigning custom roles to my own enterprise applications, so this post is a reminder to myself as to how to create and assign the roles.

## Add Custom Roles

- In the admin center, go to the **Applications...App registrations** menu item
- Select your application, and click the **App roles** menu item
- You can create your custom application roles, per the screenshot below

![Adding an app role in Entra Admin Center](../assets/img/2024/entra-add-app-role.png)

## Assigning App Roles

You can assign one role to multiple users/groups at a time:

- In the admin center, go to the **Applications...Enterprise applications** menu item
- Search for your application and click on it
- Click **Users and groups**
- Click **Add user/group**
- You can now select multiple users and/or groups, and a single role, and then click **Assign**

![Entra Admin Center app role assignment](../assets/img/2024/entra-app-role-assignment.png)

You should now be able to see your role assignments in the **Users and groups page**

![Entra role assignments](../assets/img/2024/entra-role-assignments.png)


