---
layout: post
title: Publishing web services to AKS with VSCode
date: 2024-03-17 20:11:00
tags: [azure,aks,vscode]
published: true
---

This is a guide for creating a new web application in VSCode running as a container in a Kubernetes cluster on Azure.  Note that I have created a [similar guide for Visual Studio here](/2024-03-17-vs-azure-container-aks/). 

Before starting, this assumes you have
- VSCode installed, with a working knowledge of creating web applications
  - The Docker extension to VSCode is installed
  - The Azure extension to VSCode is installed
- The Azure CLI installed and in your path
- You have a working Azure account, with some basic knowledge of how to navigate it

# Create a Web Application

1. Create a new web application project 
   ```
   dotnet new webapp
   ```
2. In Windows Explorer, right-click in the folder and click *Open in VSCode* 
3. Edit your Index.cshtml file so it has some dynamic data.  I changed the HTML portion of mine to this:
   ```html
   <div class="text-center">
     <h1 class="display-4">Welcome</h1>
     This is your page created in VSCode running in AKS!
     <hr />
     This page loaded on the server at @System.DateTime.Now.ToString("HH:mm:ss, dd MMMM yyyy")
   </div>
   ```	
4. Update your launchSettings.json
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
5. Add a *Dockerfile* to the root of your project, with the following contents:
   ```docker
   FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
   WORKDIR /app
   EXPOSE 5004
   ENV ASPNETCORE_URLS=http://+:5004
   
   FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
   ARG BUILD_CONFIGURATION=Release
   WORKDIR /src
   COPY ["AKSTest.csproj", "./"]
   RUN dotnet restore "AKSTest.csproj"
   COPY . .
   WORKDIR "/src/."
   RUN dotnet build "AKSTest.csproj" -c $BUILD_CONFIGURATION -o /app/build
   
   FROM build AS publish
   ARG BUILD_CONFIGURATION=Release
   RUN dotnet publish "AKSTest.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false
   
   FROM base AS final
   WORKDIR /app
   COPY --from=publish /app/publish .
   ENTRYPOINT ["dotnet", "AKSTest.dll"]
   ```
6. Add a *.dockerignore* file to the root of the project with the following contents
   ```
   **/.classpath
   **/.dockerignore
   **/.env
   **/.git
   **/.gitignore
   **/.project
   **/.settings
   **/.toolstarget
   **/.vs
   **/.vscode
   **/*.*proj.user
   **/*.dbmdl
   **/*.jfm
   **/azds.yaml
   **/bin
   **/charts
   **/docker-compose*
   **/Dockerfile*
   **/node_modules
   **/npm-debug.log
   **/obj
   **/secrets.dev.yaml
   **/values.dev.yaml
   README.md
   ```
7. Click the Debug icon on the left, and click *create a launch.json* and select the C# debugger<br />
   ![VSCode create launch.json](../assets/img/2077724/vscode-create-launch.png)
8. Run your project locally to ensure it works correctly.

# Create a Container Registry

1. Head on over to the [Azure Portal](https://portal.azure.com/)
2. Go to Container registries and click *Create*
3. Select the appropriate subscription and resource group
4. Create a name for your registry, I used *mattakscr*
5. Select a location
6. Select the *Basic* pricing plan (this can be changed later)<br />
   ![Create container registry in Azure Portal](../assets/img/2077724/aks-cr.png)
7. Click *Review + Create*, and then *Create*
8. Wait for the deployment to complete, and you can then go to the resource
9. Click *Access keys* on the left and enable the admin user<br />
   ![Enable container registry admin user](../assets/img/2024/aks-enable-adminuser.png)
   
# Publish your Application to Azure

1. Click on the Docker extension in VSCode, go to *REGISTRIES*, and find your container registry created above <br />
   ![Enable container registry admin user](../assets/img/2024/vscode-docker-registry.png)
2. Go back to the VSCode Explorer, and right-click the Dockerfile, and then click *Build Image in Azure...*.
   ![VSCode build image in Azure](../assets/img/2024/vscode-build-image-azure.png)
   - Tag the image as *akstest:latest*
   - Select *Azure* as the registry provider
   - Select your subscription
   - Select your container registry
   - Select Linux
   - **NOTE:** If you get an error trying to upload your image, it may be because you are not logged in.  Go to the *TERMINAL* 
     in VSCode and type `az login`, after which you will be prompted to log in with your browser.  Once logged in, you can 
	 then repeat the above steps.
3. If the image is successfully deployed, you should get a message similar to <br />
   `2024-03-17 21:19:18.141 [info] Run ID: df5 was successful after 57s`
4. Once complete, if you head back to Azure and look at the repositories in your container registry, you should see an artifact for your web app:<br />
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
   ![AKS running service](../assets/img/2024/aks-running-service-vscode.png)<br />
11. If you deploy a new version of an image, you may need to start a new rollout process before the new version is visible
    ```
	kubectl rollout restart deployment.apps/matt-aks-test
	```
 
