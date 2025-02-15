---
layout: post
title: Retrieval-Augmented Generation (RAG) using Functions with Mistral and .NET
date: 2025-02-15 08:34:00
tags: [mistral, ai]
published: true
---

This blog is the third of three, where I decided to try out [Mistral.AI](https://mistral.ai). This article covers how to use Mistral's [large language models](https://mistral.ai/technology/#models) (LLMs) in conjunction with functions that are exposed to Mistral.  The LLM will then choosse to execute/use those functions if it feels they provide additional context to the conversation.

# Technologies used

- [Mistral.AI](https://mistral.ai/technology/#models) - offers local and online high quality LLMs 
- [dotnet v8.0.12](https://dotnet.microsoft.com/en-us/download) 

# What are Functions?

Functions are an extension of RAG, and are a clever way to expose tools to the client you are using to converse with the LLM to query for additional data.

From ChatGPT: 

*RAG (Retrieval-Augmented Generation) functions refer to the different steps or components involved in the RAG process. These typically include:*

 - ***Retrieval** – The AI searches for relevant documents, facts, or data from an external knowledge source (like a database, vector store, or document repository).*
 - ***Augmentation** – The retrieved information is combined with the user's query to provide additional context.*
 - ***Generation** – A language model (like ChatGPT) processes the augmented data and generates a response that is more accurate and informed.*
  
*These functions work together to ensure that AI responses are fact-based, dynamic, and context-aware, rather than relying only on pre-trained knowledge.*

Let's dive into an example.

# Connecting to the Mistral API

To start working, you will need to:

1. Sign up with [Mistral](https://mistral.ai/) and create a developer account
2. Create a .NET 8 console application, and add the `Mistral.SDK` nuget package to your solution
3. Create an API key on the Mistral site, and add it to your app settings.  A key will look something like `xh53nppoL8uRmT!!redacted!!`

# Create a Function

I have a contrived, simplified function that determines whether a person has insurance cover, based on their age and their gender:

```csharp
[Function("This function returns whether a person will have insurance coverage, based on their age and gender")]
public static async Task<string> GetEligibility([FunctionParameter("Age of applicant", true)] int age,
[FunctionParameter("Gender", true)] Gender gender)
{
    await Task.Yield();

    if (age < 18)
    {
        return "Applicant must be 18 years or older";
    }
    if (gender == Gender.Male && age > 60)
    {
        return "Male applicants must be between 18 and 60 years of age";
    }
    if (gender == Gender.Female && age > 70)
    {
        return "Female applicants must be between 18 and 70 years of age";
    }

    return "This applicant is eligible for cover because they meet the age and gender criteria.";
}
```

Note that the description for the function is critical.  Exposing this description to the Mistral client is how it knows what the function is for, and it will only call the function if it thinks it is useful to answer the user's question.

# Exposing Functions to Mistral

Sending a request to Mistral with the functions exposed can be done as follows:

```csharp
var client = new MistralClient(appSettings.MistralApiKey);

...

Console.WriteLine("Describe your applicant:");
var applicant = Console.ReadLine();

var messages = new List<ChatMessage>()
{
    new ChatMessage(ChatMessage.RoleEnum.User, $"The applicant is described as \"{applicant}\" - are they eligible for insurance cover?  Please provide the reason for the decision.")
};
var request = new ChatCompletionRequest(ModelDefinitions.MistralSmall, messages);
request.MaxTokens = 1024;
request.Temperature = 0.0m;
request.ToolChoice = ToolChoiceType.Auto;
```

1. `applicant` is where I store my user input
2. My message to the bot is carefully constructed to try and get the details I want using my tool.  This is for the sake of the example, but suffice to note that tool execution will be inferred by the engine.
3. `ToolChoice` is Auto - I don't explicitly tell Mistral to use my function

# Executing the Function 

Mistral will not execute my function - but it will tell me it wants to!  Effectively, the flow of data is:

1. We tell the Mistral client what tools we have
2. User asks question
3. Mistral matches the question to the available tools, and tells us what tools to execute

```csharp
var response = await client.Completions.GetCompletionAsync(request).ConfigureAwait(false);

messages.Add(response.Choices.First().Message);

// note how we have not hard-coded a tool to be called - the response contains data telling us that we should
foreach (var toolCall in response.ToolCalls)
{
    var resp = await toolCall.InvokeAsync<string>();
    messages.Add(new ChatMessage(toolCall, resp));
}

if (response.ToolCalls.Count == 0)
{
    ConsoleUtils.WriteLine("No tool calls were made - perhaps try more detail.", ConsoleColor.Red);
}
else
{

    var response2 = await client.Completions.GetCompletionAsync(request).ConfigureAwait(false);
    ConsoleUtils.WriteLine(response2.Choices.First().Message.Content, ConsoleColor.Green);
}
```

In the above code:

1. Mistral does not respond with a message for the user - it responds with the tools that it suggests we call
2. For each tool suggested, we execute with `InvokeAsync`, and the result of these calls is added to the messages collection
3. We then do a final call to Mistral with the function execution results as context, and we output that to the user

# Other

Full example source code: [https://github.com/mrsalmon1976/playground-mistral-pgsql-rag](https://github.com/mrsalmon1976/playground-mistral-pgsql-rag) (See `ExecuteFunction` example)

- [Mistral, Embeddings, PostgreSQL and .NET](https://software.safish.com/2025-02-15-mistral-embeddings-with-postgresql/) 
- [Mistral, RAG and .NET](https://software.safish.com/2025-02-15-mistral-rag/)
