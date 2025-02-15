---
layout: post
title: Storing embeddings in PostgreSQL using Mistral and .NET
date: 2025-02-15 08:32:00
tags: [mistral, ai]
published: true
---

This post is the first of three, where I decided to try out [Mistral.AI](https://mistral.ai). This article covers how to use Mistral's [large language models](https://mistral.ai/technology/#models) (LLMs) to create embeddings from your own documents using .NET.

# Technologies used

- [Mistral.AI](https://mistral.ai/technology/#models) - offers local and online high quality LLMs 
- [dotnet v8.0.12](https://dotnet.microsoft.com/en-us/download) 
- [PostgreSQL](http://postgresql.org/) with vector extension - I used the [ankane/pgvector](https://hub.docker.com/r/ankane/pgvector) image in Docker Desktop for this proof of concept, but you can use [Supabase](https://supabase.com/) if you don't want to run your own database
- [Dapper](https://github.com/DapperLib/Dapper)
- [pgvector-dotnet](https://github.com/pgvector/pgvector-dotnet) - provides .NET support for working with vectors with PostgreSQL
- A book (free of copyright) called [Cricket](https://www.gutenberg.org/ebooks/67430) in text format from Project Gutenberg at https://www.gutenberg.org/ebooks/67430 - this book is large enough to cause complications with context size (we cannot retrieve embeddings for the entire book in one go)

# What are Embeddings?

While this article is relatively worthless on its own, the use of embeddings is an important requirement for Retrieval-Augmented Generation (RAG) when working with LLMs.

Embeddings are numerical representations of data used to encode words, sentences, documents, and more into a format that machine learning models can process.  Embeddings allow LLMs to quickly retrieve relevant information by comparing vector distances.

When engaging with an LLM like Mistral, you can ask it questions and it will answer you using the data on which it was trained.  However, if you want to apply your own data to the conversation, you need to supply context.  When your data set is small, you can just send the text of your entire document to intitate the conversation, but once you start needing larger documents as context this gets more difficult.

In this case, embeddings are useful - you can convert your large documents into embeddings, and then use similarity searches to extract the relevant areas of your documents and provide those as context for you conversation.

Let's dive into an example.

# Connecting to the Mistral API

To start working, you will need to:

1. Sign up with [Mistral](https://mistral.ai/) and create a developer account
2. Create a .NET 8 console application, and add the `Mistral.SDK` nuget package to your solution
3. Create an API key on the Mistral site, and add it to your app settings.  A key will look something like `xh53nppoL8uRmT!!redacted!!`

# Setting up PostgreSQL

We want to store our vectors in a database, so we can query for similarities and add relevant embeddings to our context. We also don't want to keep request embeddings for the same document repeatedly.  

Make sure you have an accessible instance of PostgreSQL running, and set up with your name/password.  You will also need to ensure that the `pgvector` extension is installed on your database.

My docker file is as follows:

```docker
version: '3.8'

services:
  postgres:
    image: ankane/pgvector
    container_name: postgres_vector
    environment:
      POSTGRES_USER: youruser
      POSTGRES_PASSWORD: yourpassword
      POSTGRES_DB: postgresql
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

From powershell, run `docker-compose up -d`.

Once connected to the database (using [pgAdmin 4](https://www.pgadmin.org/download/)), I created a `mistral` user.

First, create a table to store the embeddings.

```sql
GRANT CONNECT ON DATABASE mistralvector TO mistral;
GRANT CREATE ON DATABASE mistralvector TO mistral;

GRANT USAGE ON SCHEMA public TO mistral;
GRANT CREATE ON SCHEMA public TO mistral;

CREATE EXTENSION vector;        -- enables the vector extension on your database

CREATE TABLE embeddings (
	id bigserial primary key,
	document_id text,           -- used to group embeddings
	content text,               -- text content of the embedding
	embedding vector(1024)      -- the dimension of our embedding
);
```

Note that the `document_id` should really be a foreign key, but for purposes of the example it is just a text identifier that we will hard-code.

# Using LangChain to split your text

To enable vector searches, we need to store our document in vector format i.e. create embeddings.  However, there is a problem here - embeddings that are too large become far too broad and are not useful. A better approach is to break your document up into chunks, and create an embedding for each of these chunks.  To do this, we use [LangChain](https://www.langchain.com/).

LangChain itself is a Python library, but fortunately there is a [C# port](https://github.com/tryAGI/LangChain) with an [associated NuGet package](https://www.nuget.org/packages/LangChain).  This can be used to split large documents into chunks that can be used for your RAG process.  While there are no hard and fast rules and the best results will require some trial and error, these basic rules apply:
 
- Shorter chunks capture precise meanings, but may miss wider context
- Longer chunks mean there is more context to answer questions, but can produce too broad a scope of information and may reduce the quality of the similarity search that the vector database does (the underlying value of the embedding may be ambiguous)
- You should optimise for the smallest possible size that doesn't lose context

Chunk size and overlap are dependent on your use case, but for my example I went with 400 and 50 respectively (based on advice from ChatGPT itself!).  This method will return the text from your document, but split into multiple items with overlap.

```csharp
private static List<string> SplitDocument(string documentPath, int chunkSize, int chunkOverlap)
{
    string[] text = { File.ReadAllText(documentPath) };
    var texts = new ReadOnlyCollection<string>(text);

    var splitter = new LangChain.Splitters.Text.RecursiveCharacterTextSplitter(chunkSize: chunkSize, chunkOverlap: chunkOverlap);

    var splitDocuments = splitter.CreateDocuments(texts);

    return splitDocuments.Select(x => x.PageContent).ToList();
}
```

# Generate the embeddings

Now that we have chunks of text, we generate the embeddings for each chunk, and for this we use the Mistral Embeddings model via the API.  As mentioned before, because this is a very large document, we cannot create embeddings for the entire document at once - the model (`ModelDefinitions.MistralEmbed`) has a limit of just over 16,000 tokens.

Strictly speaking we should be breaking the document into tokens and sending as few requests as possible, but we know the chunk size so for the sake of reducing the complexity of the example, we can take a fair guess (with some buffer) as to how many chunks we can do at once.

This is a fairly complex method that breaks the split documents up into batches, and generates embeddings per batch, finally sending all embeddings back as a single set of `EmbeddingDocument` models:

```csharp
private static async Task<IEnumerable<EmbeddingDocument>> CreateEmbeddings(MistralClient client, List<string> input, int maxDocumentsPerBatch = 100)
{
    var result = new List<EmbeddingDocument>();

    // Process input in batches
    for (var i = 0; i < input.Count; i += maxDocumentsPerBatch)
    {
        // Get the current batch of input
        var batch = input.Skip(i).Take(maxDocumentsPerBatch).ToList();

        // Create the embedding request for the current batch
        var request = new EmbeddingRequest(ModelDefinitions.MistralEmbed, batch);

        // Get embeddings for the current batch
        var response = await client.Embeddings.GetEmbeddingsAsync(request);

        // Add the results to the list
        for (var j = 0; j < batch.Count; j++)
        {
            result.Add(new EmbeddingDocument()
            {
                Index = i + j,
                Content = batch[j],
                Embedding = response.Data[j].Embedding
            });
        }
    }

    return result;
} 
```

Note that we use a custom model to store each embedding along with the original text (`Content`) from which the embedding was generated - this is very useful for 
debugging as the embeddings themselves are unreadable sets of numbers!

```csharp
internal class EmbeddingDocument
{
    public int Index { get; set; }

    public string Content { get; set; } = String.Empty;

    public List<decimal> Embedding { get; set; } = new List<decimal>();
}
```

# Saving embeddings to PostgreSQL

Saving to the database using `Dapper` and the `PgVector` Dapper extension is the easy part.

1. Add pre-requisites to your solution: `Dapper`, `PgVector` and `PgVector.Dapper`

2. Ensure the Vector type is loaded for Dapper (this only needs to be done once on application startup):
    ```csharp
    SqlMapper.AddTypeHandler(new VectorTypeHandler());
    ```

3. Create a model for storing embeddings in the database - this corresponds to the table declared above:

    ```csharp
    internal class DbEmbedding
    {
        public long Id { get; set; }

        public string DocumentId { get; set; } = String.Empty;

        public string Content { get; set; } = String.Empty;

        public Vector Embedding { get; set; } = new Vector(new float[] { 1, 1, 1 });
    }
    ```

4. Convert the embedding models into `DbEmbedding` objects
    ```csharp
    public DbEmbedding ConvertEmbeddingDocumentToDbEmbedding(EmbeddingDocument embeddingDocument)
    {
        float[] embedding = EmbeddingUtils.ConvertToFloat(embeddingDocument.Embedding).ToArray();

        return new DbEmbedding()
        {
            DocumentId = embeddingDocument.Index.ToString(),
            Content = embeddingDocument.Content,
            Embedding = new Vector(embedding)
        };
    }
    ```

5. Save the embeddings to the database:
    ```csharp
    string sql = @$"INSERT INTO embeddings 
        (document_id, content, embedding) 
        VALUES 
        ('{documentId}', @Content, @Embedding)";
    await _dbContext.DbConnection.ExecuteAsync(sql, embeddings);
    ```
6. Execute!
   ```csharp
       var embeddings = embeddingDocuments.Select(x => modelMapper.ConvertEmbeddingDocumentToDbEmbedding(x));
    await embeddingsRepo.SaveEmbeddings("CRICKET_LAW_CHANGE_PROPOSAL", embeddings);
    ```

# Searching for similar embeddings

Now, before we engage with the LLM, we can also attach embeddings as context.  The process here is:

1. Take the user's question and turn it into an embedding
2. Use the embedding to look for similar text in our database
3. Attach the embeddings as context when querying the LLM, along with the user's question.

Searching for similarities is fairly simple:

```csharp
var question = "This is your user's question";
var questionEmbedding = (await CreateEmbeddings(client, new List<string> { question })).First();
var floatValues = questionEmbedding.Embedding.Select(d => (float)d).ToArray();
var questionVector = new Vector(floatValues);

string sql = @"SELECT 
        id AS Id, 
        content AS Content,
        1 - (embedding <-> @Vector) AS Similarity
    FROM embeddings 
    WHERE 1 - (embedding <-> @Vector) > @Threshold
    ORDER BY embedding <-> @Vector LIMIT @Limit";

// low threshold as we want matches, but limited to 5 - this is very contrived and you will need to test these values out
var matches = await _dbConnection.QueryAsync<EmbeddingComparison>(sql, new { Vector = vector, Threshold = 0.2F, Limit = 5 });

Console.WriteLine($"Matches: {matches.Count()}");
int matchNum = 1;
foreach (var match in matches)
{
    ConsoleUtils.WriteLine($"Match {matchNum++}", ConsoleColor.Green);
    Console.WriteLine(match.Content);
}
```

You will need a specific model for this result, which I called `EmbeddingComparison`:

```csharp
internal class EmbeddingComparison
{
    public long Id { get; set; }

    public string Content { get; set; } = String.Empty;

    public float Similarity { get; set; }
}
```

# Using the Embeddings

Now, you can use the content from the similar items to add context.  

1. Retrieve matches from the database as per above
2. Use the `Content` property of the matches returned from the database to build context, for example:
   ```csharp
   var requestContent = $"Document context: {concatenatedContent} - Question: {userQuestion}";
   ```
   This would be used as your *user* `ChatMessage`, which will be covered in the next blog post.

# Other

Full example source code: https://github.com/mrsalmon1976/playground-mistral-pgsql-rag (See LocalVectorSearch example)
