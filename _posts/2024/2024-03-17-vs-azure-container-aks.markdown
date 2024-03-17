---
layout: post
title: Publishing web services to AKS with Visual Studio
date: 2024-03-17 15:20:00
tags: [azure,aks,visualstudio]
published: true
---

This is a guide for creating a new web application in Visual Studio running as a container in a Kubernetes cluster on Azure.

Before starting, this assumes you have
- Visual Studio installed, with a working knowledge of creating web applications
- The Azure CLI installed and in your path
- You have a working Azure account, with some basic knowledge of how to navigate it

# Create a Web Application

1. Create a new web application project in Visual Studio
   ![Create web application in Visual Studio](../assets/img/2024/vs-create-web-app.png)<br />
   ![Create web application in Visual Studio with Docker enabled](../assets/img/2024/vs-create-web-app2.png)<br />
2. Edit your Index.cshtml file so it has some dynamic data.  I changed the HTML portion of mine to this:
   ```html
   <div class="text-center">
     <h1 class="display-4">Welcome</h1>
     This is your page running in AKS!
     <hr />
     This page loaded on the server at @System.DateTime.Now.ToString("HH:mm:ss, dd MMMM yyyy")
   </div>
   ```	
3. Run your project locally to ensure it works correctly.

# Create a Container Registry

1. Head on over to the [Azure Portal](https://portal.azure.com/)
2. Go to Container registries and click *Create*
3. Select the appropriate subscription and resource group
4. Create a name for your registry, I used *mattakscr*
5. Select a location
6. Select the *Basic* pricing plan (this can be changed later)<br />
   ![Create container registry in Azure Portal](../assets/img/2024/aks-cr.png)
7. Click *Review + Create*, and then *Create*
8. Wait for the deployment to complete, and you can then go to the resource
9. Click *Access keys* on the left and enable the admin user<br />
   ![Enable container registry admin user](../assets/img/2024/aks-enable-adminuser.png)
   
# Publish your Application to Azure

1. Right-click you project and click publish<br />
   ![Publish web project](../assets/img/2024/aks-vs-publish.png)
2. Select Azure as your publish target<br />
   ![Publish web project target](../assets/img/2024/aks-publish-target.png)
3. Select Azure container registry<br />
   ![Publish web project specific target](../assets/img/2024/aks-publish-target2.png)
4. At this point you may need to sign into your Microsoft account.  Once signed in, you should see your resource group which contains your container registry<br />
   ![Publish web project selecting container registry](../assets/img/2024/aks-publish-select-cr.png)
6. Select Docker Desktop<br />
   ![Publish web project building with docker](../assets/img/2024/aks-publish-docker.png)
7. Close the window, and publish to Azure (note: this can take a long time!)<br />
   ![Publish web project to Azure](../assets/img/2024/aks-azure-publish.png)
8. Once complete, if you head back to Azure and look at the repositories in your container registry, you should see an artifact for your web app:<br />
   ![Web application artifact](../assets/img/2024/aks-repo-artifact.png)
   
# Create your AKS Cluster

1. Go to *Kubernetes Services* in the Azure portal
2. Click *Create*, and *Create Kubernetes cluster*
3. Complete the form
   - Make sure you select the correct resource group
   - Use the Dev/Test preset configuration
   - Select the appropriate region
   - Use the *Free* pricing tier
   - Select an upgrade path - the default *Enabled with patch* is recommended, as only minor version updates will be applied
   - ![Create Kubernetes cluster form](../assets/img/2024/aks-create-cluster.png)
4. Navigate to the *Integrations* tab
   - Select the container registry you created earlier
   - ![Create Kubernetes cluster form](../assets/img/2024/aks-create-cluster-integrations.png)
   - Click *Review + create*, wait for validation to complete, and then click *Create*
5. AKS clusters take quite a while to deploy, but once up and running you should be able to navigate to the resource and confirm it is up and running.
   - ![AKS overview](../assets/img/2024/aks-overview.png)

# Deploy your Container to AKS

1. Open a Powershell window
2. If you have never used AKS before, you will need to install the AKS CLI
   ```
   az aks install-cli
   ```
3. Close the Powershell command window, and reopen it again - this is so the AKS CLI is correctly in your path
4. Run `az login` to ensure you are logged into your Azure account in the CLI
5. Connect to the AKS cluster, using your resource group instead of `matt-test-reg` and your AKS cluster name instead of `matt-test-aks`
   ```
   az aks get-credentials --resource-group matt-test-rg --name matt-test-aks
   ```
   This is required so the `kubectl` command has the credentials to work with our AKS cluster.
6. If you run the following command
   ```
   kubectl get nodes
   ```
   you should now see the nodes that are ready for you - these are determined by AKS and will change dynamically.<br />
   ![AKS get running nodes](../assets/img/2024/aks-kubectl-get-nodes.png)
7. Create a `deployment.yaml` file like the following:
   ```yml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: matt-aks-test
   spec:
     selector:
       matchLabels:
         app: matt-aks-test
     template:
       metadata:
         labels:
           app: matt-aks-test
       spec:
         containers:
         - name: matt-aks-test
           image: mattakscr.azurecr.io/akstest:latest
           resources:
             limits:
               memory: "128Mi"
               cpu: "500m"
           ports:
            - containerPort: 80
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: matt-aks-test
   spec:
     type: LoadBalancer
     ports:
     - port: 80
       targetPort: 5004
     selector:
       app: matt-aks-test      
   ```
	Make sure you replace the image with your repository name (found under Container registries / Repositories) and replace `matt-aks-test` with your container application name.
8. Run the following command from the command line:
   ```
   kubectl apply -f .\deployment.yaml
   ```
   This should result in your service being created in Azure.
9. Head back to the portal and go to your Kubernetes cluster, and click *Services and ingresses*.  You should see your application 
   appearing with a *Type* of *LoadBalancer*, which means it is available externally (the other services are internal services).<br />
   ![AKS services and ingresses](../assets/img/2024/aks-services-and-ingresses.png)
10. You will also see the external IP address of your service.  If you click that, it should now load your service in the browser.<br />
   ![AKS running service](../assets/img/2024/aks-running-service.png)
 
 # Dockerfile and launchSettings.json

 It is important to ensure that the Dockerfile exposes the correct ports, and tie up to the application launch settings.  My default files created by Visual Studio did not tie up and 
 resulted in my web site timing out.  I had to adjust the ports in the two files, republish 
 my container, and then reapply the deploy with `kubectl`.

 ## launchSettings.json

 ```json
 {
  "profiles": {
    "AKSTest": {
      "commandName": "Project",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      },
      "dotnetRunMessages": true,
      "applicationUrl": "https://localhost:5005;http://localhost:5004"
    },
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "Docker": {
      "commandName": "Docker",
      "launchBrowser": true,
      "launchUrl": "{Scheme}://{ServiceHost}:{ServicePort}",
      "environmentVariables": {
        "ASPNETCORE_URLS": "https://+:443;http://+:80"
      },
      "publishAllPorts": true,
      "useSSL": true
    }
  },
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:41470",
      "sslPort": 44317
    }
  }
}
```

## Dockerfile

```docker
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 5004
ENV ASPNETCORE_URLS=http://+:5004

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["AKSTest/AKSTest.csproj", "AKSTest/"]
RUN dotnet restore "./AKSTest/./AKSTest.csproj"
COPY . .
WORKDIR "/src/AKSTest"
RUN dotnet build "./AKSTest.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./AKSTest.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AKSTest.dll"]
```