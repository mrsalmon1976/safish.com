---
layout: post
title: Retrieval-Augmented Generation (RAG) with Mistral and .NET
date: 2025-02-15 08:33:00
tags: [mistral, ai]
published: true
---

This post is the second of three, where I decided to try out [Mistral.AI](https://mistral.ai). This article covers how to use Mistral's [large language models](https://mistral.ai/technology/#models) (LLMs) to use Retrieval-Augmented Generation (RAG) to query your own documents.

# Technologies used

- [Mistral.AI](https://mistral.ai/technology/#models) - offers local and online high quality LLMs 
- [dotnet v8.0.12](https://dotnet.microsoft.com/en-us/download) 

# What is RAG?

From ChatGPT: *RAG (Retrieval-Augmented Generation) is a technique that makes AI-powered chatbots and assistants smarter by combining two key abilities: searching for information and generating responses. Instead of relying only on what the AI was trained on, RAG helps it look up the most relevant facts from a database or documents before forming an answer. This means the AI can provide more accurate, up-to-date, and context-aware responses, especially for complex or niche topics.*

Let's dive into an example.

# Connecting to the Mistral API

To start working, you will need to:

1. Sign up with [Mistral](https://mistral.ai/) and create a developer account
2. Create a .NET 8 console application, and add the `Mistral.SDK` nuget package to your solution
3. Create an API key on the Mistral site, and add it to your app settings.  A key will look something like `xh53nppoL8uRmT!!redacted!!`

# Local Data

For my example, I wanted a text document that I knew was unique - it can't be something that the trained Mistral model would possibly understand.  I also wanted it to be fairly small, otherwise you need to worry about the context size and splitting the document up.

I like cricket, so I created a document with some silly proposals for changes the basic laws of cricket:

```text
Proposal 1: The blade of a cricket bat may not exceed 11cm in width and 7cm in depth.
Proposal 2: New balls shall not weigh less than 154g.
Proposal 3: An over will be 7 balls.
Proposal 4: A wide will be considered a valid ball in the over, but will cost the bowling team 10 runs.
Proposal 5: A Boundary 8 will be scored if and only if the ball has been struck by the bat and is first grounded beyond the boundary without having been in contact with the ground within the field of play.  This shall apply even if the ball has previously touched a fielder.
Proposal 6: A ball will become dead if a goose lands on the field.
Proposal 7: All players on the field must wear red shirts while batting, and blue shirts while fielding.
Proposal 8: All players on the batting side not on the field must wear white shirts.
Proposal 9: Rain will no longer stop play.  The game will continue regardless of the weather conditions, unless there is danger of lightning.
```

# Using Mistral to ask questions about my document

The code to chat to Mistal about my law changes is actually very small:

```csharp
public static async Task Run(AppSettings appSettings)
{
    using var client = new MistralClient(appSettings.MistralApiKey);

    Console.WriteLine();
    Console.WriteLine("Ask as many questions as you like about the new proposals.");

    string context = File.ReadAllText(appSettings.CricketLawChangeProposalDocumentPath);
    string question = String.Empty;

    while (true)
    {
        Console.Write(">> ");
        question = (Console.ReadLine() ?? String.Empty);
        if (question.ToLower() == "exit")
        {
            Console.WriteLine("Thanks for playing!");
            break;
        }

        if (!String.IsNullOrEmpty(question))
        {
            await Chat(client, context, question);
        }
        Console.WriteLine();
    }
}

private static async Task Chat(MistralClient client, string context, string question)
{
    var request = new ChatCompletionRequest(
        //define model - required
        ModelDefinitions.MistralSmall,
        //define messages - required
        new List<ChatMessage>()
        {
          new ChatMessage(ChatMessage.RoleEnum.System, "You are a professional cricket umpire."),
          new ChatMessage(ChatMessage.RoleEnum.User, $"New law proposals: {context} - Question: {question}")
        },
        //optional - defaults to 0.7, determines the creativity of the response (lower values are more focused, higher values up to 1 are more random)
        temperature: 0.7M
    );

    // stream the response (use GetCompletionAsync to fetch the result in one go)
    var streamedResponse = client.Completions.StreamCompletionAsync(request);
    await foreach (var chunk in streamedResponse)
    {
        Console.Write(chunk.Choices[0].Delta.Content);
    }
}
```

The are some key points to note:

1. I have created a `while` loop to keep the chat running until the user types `exit`
2. I am using the `MistralSmall` model - you will need to select the [correct model](https://docs.mistral.ai/getting-started/models/models_overview/) for your use case.  Larger models provide for larger context and higher accuracy, at a dollar cost.
3. When I ask my question, I also set the scene using the `System` role - this is not mandatory but is useful for setting the tone of your bot.  In my case, I tell it to be a professional cricket umpire, but you can get some amusing results but settig it to a sarcastic cricket umpire, or a grumpy cricket umpire.
4. The `temperature` setting is important - I am using the default value but its worth noting that this also needs to be played with get the right trade-offs between creativity and focus.
5. My example calls `client.Completions.StreamCompletionAsync`, which provides for a better user experience by streaming the response back - the user gets text in chunks and can start reading before the entire response has been generated.  However, if you want to retrieve the entire response in one go, change this code to
   ```csharp
   var response = await client.Completions.GetCompletionAsync(request);
   Console.WriteLine(response.Choices.First().Message.Content); 
   ```

# Other

Full example source code: [https://github.com/mrsalmon1976/playground-mistral-pgsql-rag](https://github.com/mrsalmon1976/playground-mistral-pgsql-rag) (See `CricketLawChangeChat` example)

- [Mistral, Embeddings, PostgreSQL and .NET](https://software.safish.com/2025-02-15-mistral-embeddings-with-postgresql/) 
- [Mistral, RAG Functions and .NET](https://software.safish.com/2025-02-15-mistral-rag-functions/)
