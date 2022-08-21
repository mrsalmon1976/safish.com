---
layout: post
title: Export MongoDb query to CSV
date: 2016-08-16 17:16:00
tags: [mongodb]
published: true
---

Flattening out MongoDb documents can be a bit of pain. I use RoboMongo to inspect database documents, and I may be stupid, but although I can query individual fields, the GUI will still present them in tree format, so I don't get a nice "spreadsheet" view that I can export and send to users when they request data.

However, MongoDb, by default, comes with an export function that can be used to easily extract (at a field level) documents to a CSV file. In my example below, we have a complex Workflow document where the required fields are many nodes down the tree. This is easily extracted as follows:

```shell
mongoexport --db Workflows --collection Workflows --csv -f "Workflow.CreatedOn,Workflow.OrderInfo.Amount,Workflow.OrderInfo.ReferenceNumber" -o out.csv
```

This will extract three fields into three columns, with headings. You can even filter the results by passing a query with a "-1" parameter.