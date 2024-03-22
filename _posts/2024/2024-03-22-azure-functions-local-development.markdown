---
layout: post
title: Azure Functions Local Development
date: 2024-03-22 13:22:00
tags: [azure]
published: true
---

Azure functions can be developed locally on Windows using VSCode or Visual Studio.  This article covers how to create local functions using Visual Studio.  Note that you can also do this in VSCode - you will need the [Azure Tools extensions](https://code.visualstudio.com/docs/azure/extensions) and the [Azure Functions Core Tools](https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=windows%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-csharp).

The example covers a hypotetical application that has two functions:
- *SubmitUrl* - allows a third party to send a web site address to the function, which places the request onto Azure Queue Storage
-  *ExecuteWebRequest* - reads the message from the queue, submits a GET request to the URL supplied, and logs the request in a CosmosDB database.  It then submits adds a new message to the queue to resubmit.

This is of course a contrived exampled, but is a realistic example for when you don't want to execute potentially long-running actions synchronously.

# Create the Project

Create a new Azure Functions project, making sure you enable Azurite which will be used to emulate the Azure queue storage

![Create an Azure functions project](../assets/img/2024/azure-functions-project.png)

![Create an Azure functions project with Azurite](../assets/img/2024/azure-functions-project2.png)

# Set up Dependency Injection

You will want to unit test your function code and remove hard dependencies, so set  up Dependency Injection from the start.

Add references to:
- `Microsoft.Azure.Functions.Extensions`
- `Microsoft.Extensions.DependencyInjection`
- `Microsoft.Extensions.Http` (this is for `IHttpClient`)

Add a `Startup.cs` class to your functions project:

```csharp
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using System;

[assembly: FunctionsStartup(typeof(MyFunctionsService.Startup))]

namespace MyFunctionsService;

public class Startup : FunctionsStartup
{
    public override void Configure(IFunctionsHostBuilder builder)
    {
        builder.Services.AddHttpClient();
    }
}
```

You can now create a new function class (like any other class), and add dependencies in the constructor:

```csharp
namespace MyFunctionsService
{
    public class ExecuteWebRequest
    {

        private readonly HttpClient _httpClient;

        public ExecuteWebRequest(IHttpClientFactory httpClientFactory)
        {
            this._httpClient = httpClientFactory.CreateClient();
        }

        [FunctionName("ExecuteWebRequest")]
        // function Run method goes here (more later)
    }
}
```

# Set up Azure Queue Storage and CosmosDB

Azure Queue Storage is very easy to set up - you can use the [Azurite storage emulator](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azurite?tabs=visual-studio%2Cblob-storage) which is installed by default with Visual Studio.  All you need to do is ensure the connection string is added to you *local.settings.json* (see below).

For CosmosDB, you will need the [CosmosDB Emulator](https://learn.microsoft.com/en-us/azure/cosmos-db/emulator) installed.  Once installed, open the emulator and go to the quickstart open to retrieve your connection string.

![CosmosDB Emulator](../assets/img/2024/azure-functions-cosmosdb-emulator.png)

Add the connection string to your *local.settings.json* file:

```json
{
  "IsEncrypted": false,
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "dotnet",
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "AzureQueueStorageConnection": "UseDevelopmentStorage=true",
    "CosmosDBConnection": "YourConnectionString",
  }
}

```

Add the CosmosDB client to your DI container as a *singleton*.  Note that I have wrapped it up into a DbContext service to make working with the databases and containers a little easier.

```csharp
    builder.Services.AddSingleton<IFunctionServiceDbContext>((x) =>
    {
        string dbConnectionString = Environment.GetEnvironmentVariable("CosmosDBConnection");
        var cosmosClient = new CosmosClient(dbConnectionString);
        IFunctionServiceDbContext dbContext = new FunctionServiceDbContext(cosmosClient);
        dbContext.Initialise();
        return dbContext;
    });
```

You will need to create your database and your containers.  As the CosmosDB client is a singleton, in the startup 
process I usually add code to create any missing containers at that point in the above `dbContext.Initialise()` call, similar to the following:

```csharp
Database db = _cosmosClient.GetDatabase("FunctionService");
db.CreateContainerIfNotExistsAsync("FunctionServiceWebRequest", "/id");
```

# Create *SubmitUrl* Function

We can now create the first function, that will receive a URL via a GET request, and place a message on the queue for subsequent procesing.

Add a new class that will contain the method handling the web request, assuming it will receive a URL and poll interval via querystring (keys: *'url'* and *'pollInterval'*).  For the function, that means the follows:

- the trigger will be an **HTTP Trigger**, effectively working as an online API call
- the binding will be to the Azure Storage Queue, sepcifically defined using the `Microsoft.Azure.WebJobs.QueueAttribute` decorating the `Microsoft.Azure.Storage.Queue.CloudQueue`

First, create a simple model that will be used on the message queue - it's a good idea to always use a model as you don't know when you may need to extend it with other properties:

```csharp
public class UrlSubmissionMessage
{
    public UrlSubmissionMessage()
    {

    }

    public UrlSubmissionMessage(string url, int pollInterval)
    {
        Url = url;
        PollInterval = pollInterval;
    }

    public string Url { get; set; }

    public int PollInterval { get; set; }
}
```

Finally, implement the function itself:

```csharp
public static class SubmitUrl
{
    [FunctionName("SubmitUrl")]
    public static async Task Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
        [Queue("UrlSubmissionQueue", Connection = "AzureQueueStorageConnection")]CloudQueue outputQueue, 
        ILogger logger
        )
    {
        string url = req.Query["url"];
        if (String.IsNullOrWhiteSpace(url))
        {
            throw new ArgumentException("'url' is a mandatory field");
        }

        int pollInterval = 0; 
        Int32.TryParse(req.Query["pollInterval"], out pollInterval);

        UrlSubmissionMessage urlSubmissionMessage = new UrlSubmissionMessage(url, pollInterval);
        string msg = JsonConvert.SerializeObject(urlSubmissionMessage);

        var cqm = new CloudQueueMessage(msg);
        await outputQueue.AddMessageAsync(cqm);
        logger.LogInformation($"URL submission for {url} added to the UrlSubmissionQueue with poll interval {pollInterval}");
    }
}
```

Some items to note:
- This is a static class with no dependencies.  This does not need to be the case, see the *ExecuteWebRequest* sample below.
- The trigger is defined with the `HttpTrigger` attribute, with the `GET` verb
- The binding is defined with the `Queue` attribute, where we set the name of the Queue and the connection string
- A logger is added to the method arguments

If you run your project now, you should see the function exposed:

![Functions visible when running the functions project](../assets/img/2024/azure-functions-run-project1.png)

Because this function defines an HttpTrigger, you can see the URL exposed for your trigger.

# Create *ExecuteWebRequest* Function

Next, let's create the function that will pick the message off the queue, execute it, and save the result to our CosmosDB database.  If the poll interval is set, add another message to the queue.

This means we now have three dependencies:

- the trigger will be a **Queue Trigger**
- The CosmosDB client will be injected into the function
- the binding will be to the Azure Storage Queue, sepcifically defined using the `Microsoft.Azure.WebJobs.QueueAttribute` decorating the `Microsoft.Azure.Storage.Queue.CloudQueue`

First, we define the document that will be stored in CosmosDb (I like sticking to C# naming standards so I decorate the properties to save as a different name):

```csharp
public class WebRequestSubmission
{
    public WebRequestSubmission()
    {
        this.Id = Guid.NewGuid();
    }

    [JsonProperty("id")]
    public Guid Id {  get; set; }

    [JsonProperty("url")]
    public string Url { get; set; }

    [JsonProperty("responseTimeMilliseconds")]
    public long ResponseTimeMilliseconds { get; set; }

    [JsonProperty("responseStatusCode")]
    public HttpStatusCode ResponseStatusCode { get; set; }

    [JsonProperty("isResponseSuccess")]
    public bool IsResponseSuccess { get; set; }

    [JsonProperty("requestDateTimeUtc")]
    public DateTime RequestDateTimeUtc { get; set; }
}
```

The function will then look something like this:

```csharp
public class ExecuteWebRequest
{

    private readonly HttpClient _httpClient;
    private readonly IFunctionServiceDbContext _dbContext;

    public ExecuteWebRequest(IHttpClientFactory httpClientFactory, IFunctionServiceDbContext dbContext)
    {
        this._httpClient = httpClientFactory.CreateClient();
        this._dbContext = dbContext;
    }

    [FunctionName("ExecuteWebRequest")]
    public async Task Run(
        [QueueTrigger("UrlSubmissionQueue", Connection = "AzureQueueStorageConnection")] string queueItem,
        [Queue("UrlSubmissionQueue", Connection = "AzureQueueStorageConnection")] CloudQueue outputQueue,
        ILogger logger)
    {
        UrlSubmissionMessage urlSubmission = JsonConvert.DeserializeObject<UrlSubmissionMessage>(queueItem);

        // send the web request
        var uri = new Uri(urlSubmission.Url);
        Stopwatch timer = new Stopwatch();
        DateTime requestDateTime = DateTime.UtcNow;
        logger.LogInformation($"Submitting web request to {urlSubmission.Url}");
        timer.Start();
        var response = await _httpClient.GetAsync(uri);
        timer.Stop();
        logger.LogInformation($"Completed web request to {urlSubmission.Url}");

        WebRequestSubmission webRequest = new WebRequestSubmission()
        {
            IsResponseSuccess = response.IsSuccessStatusCode,
            Url = urlSubmission.Url,
            ResponseStatusCode = response.StatusCode,
            ResponseTimeMilliseconds = timer.ElapsedMilliseconds,
            RequestDateTimeUtc = requestDateTime
        };

        // save the result to the database
        var container = _dbContext.GetContainer("WebRequest");
        await container.CreateItemAsync<WebRequestSubmission>(webRequest);

        // add a new queued item
        if (urlSubmission.PollInterval > 0)
        {
            var cqm = new CloudQueueMessage(queueItem, false);
            outputQueue.AddMessage(cqm, initialVisibilityDelay: TimeSpan.FromMinutes(urlSubmission.PollInterval));
            logger.LogInformation($"URL submission for {urlSubmission.Url} added to the UrlSubmissionQueue with poll interval {urlSubmission.PollInterval}");
        }
        else
        {
            logger.LogInformation($"No poll interval suppled for {urlSubmission.Url}");
        }
    }
}
```

Some items to note:
- This is a standard class, with the IHttpClient and database context injected into the constructor
- The trigger is defined with the `QueueTrigger` attribute
- Results of the request execution are persisted to the Cosmos DB container
- The binding is defined with the `Queue` attribute, with an item added back to the queue with a future time if a `pollInterval` is supplied

If you run your project now, you will see there are two functions available:

![Functions visible when running the functions project](../assets/img/2024/azure-functions-run-project2.png)

# Running the Project

We are now ready to run!  Because we defined an `HttpTrigger` with a `GET` method, we can just fire off the URL in a web browser, which in my case is

```
http://localhost:7183/api/SubmitUrl?url=https://www.google.com&pollInterval=1
```

This results in an item stored in CosmosDb:

![CosmosDb saved document](../assets/img/2024/azure-functions-db-item.png)

With the PollInterval set to 1, it also results in a new execution 1 minute later.

  