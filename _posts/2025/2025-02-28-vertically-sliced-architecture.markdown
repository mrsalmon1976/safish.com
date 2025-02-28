---
layout: post
title: Vertically Sliced Architecture
date: 2025-02-28 11:32:00
tags: [architecture]
published: true
---

This post is as a result of watching [a video on YouTube](https://www.youtube.com/watch?v=1PAGtLwOH4Y&t) presented by [Chris Sainty](https://chrissainty.com/) at [NDC Oslo](https://ndcoslo.com/).

I absolutely love this video and it is well worth a watch for any senior developer, technical lead, or solutions architect.  

## Key takeouts for me

- Forget onion architecture or classic data/business logic/view layers - these start off clean but through the years the layers start depending on the same code, resulting in dependencies across all levels of the application - code becomes hard to maintain
- An example is the good old service classes which grow to be 1000s of lines long, depending on multiple repositories to get their job done - a complete abandonment of single responsibility
- Rather construct your application by business feature - so you literally have folders broken up by feature, where features do not communicate (ever!)

## Benefits

- Each use case can be designed for what it needs - there is no need to add contrived layers to comply with a set standard
- Each layer can be viewed and understood in isolation
- Developer productivity - developers know that they are seeing the feature in entirety - they don't have to worry about hidden dependencies or breaking other features when changing shared code
- Much easier to decompose
- Makes large feature changes easy - create a whole new feature, create a code path between the old and the new, and once the new feature is in full use - you just delete the old (and deleting features is safe and easier as nothing else depends on it)

## Application Example

There is no set way to define your folder structure, as long as features are defined and do not talk to each other.  You could:

- Create all features in one flat folder
- Create features in a named area 
- Create features into product area

Given an application that deals with insurance policies, I would personally group it into product areas like so (I realise this is rather contrived):

- Project Root
    - Features
        - Insurers
            - List (Data, Logic, UI)
            - Create (Logic, UI)
            - View (Data, Logic, UI)
            - MonthlyMarketing (Data, Logic)
        - Claims
            - Create (Logic, UI)
            - View (Data, Logic, UI)
        - Policies
            - Create (Logic, UI)
            - View (Data, Logic, UI)

Some notes here: 
- Never share code between verticals 
- The claim Create feature may contain an API endpoint, a screen, and logic in a file - but the entire feature is housed in a single place
