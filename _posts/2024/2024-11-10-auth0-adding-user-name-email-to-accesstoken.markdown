---
layout: post
title: Adding user name and email address to an Auth0 access token
date: 2024-11-13 21:40:00
tags: [auth0]
published: true
---

When creating a Single Page Application (SPA) with a backend API using [Auth0], there are two types of tokens you will encounter:

- **ID tokens** - these are used to authenticate a user, and are available on the *client* 
- **Access tokens** - are used to authorize access to resources, and are appended on the client to backend requests 

The problem is, the ID token has details about the current user, but by default the Access token does not.  The access token will contain a **sub** - this is the subject identifies the principal that is the subject of the JWT and does uniquely identify the user, but it is not a usable value.  For example, if the user logged in via a Google accont, the sub value will be something like `google-oauth2|118034840821107000000` (this is not a real number). 

While you could pass the ID token values through on your requests, this is not secure as a threat actor could use a valid access token with spoofed user details.

Auth0 allows you to configure Action Triggers that will allow you to intercept the creation of the token, and append the values you'd like included.

1. In the Auth0 dashboard, go to `Actions`, `Triggers`, and `post-login`
    ![Auth0 Post-Login Action Trigger](../assets/img/2024/auth0-action-trigger-postlogin.png)
2. Under `Add Action`, click `Custom`, and then `Create Action`
    ![Auth0 Post-Login Action Trigger](../assets/img/2024/auth0-create-custom-action.png)
3. Name your trigger
    ![Name Post-Login Trigger](../assets/img/2024/auth0-name-trigger.png)
4. Add any custom claims to the access token.  In my example, I am adding the user's email, full name, first name, and surname.
    ![Add custom claims](../assets/img/2024/auth0-add-custom-claims-to-access-token.png)
5. Deploy your trigger by clicking the "Deploy" button
6. Go back to `Actions`, `Triggers` and then `post-login` (as per step 1)
7. Drag your custom trigger into the pipeline
    ![Add post-login trigger](../assets/img/2024/auth0-add-post-login-trigger.png)
8. Click `Apply`

On your client application, you will now need to log out and back in, and now, if you inspect the token - it will contain the claims you added.

![Auth0 custom claims on access token](../assets/img/2024/auth0-custom-claims.png)




   
