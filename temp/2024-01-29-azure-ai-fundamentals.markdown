---
layout: post
title: Azure AI Fundamentals
date: 2024-01-29 10:06:00
tags: ai, azure
published: false
---

Microsoft Azure Virtual Training Day

# What is AI?

- Software that imitates human capabilities.
- Predicts outcomes and recognizes patterns based on historic data
- Interprets visual input
- Understands language and engages in conversations
- Extracts information from sources to gain knowledge
  
Dull, repetitive tasks are great candidates for outsourcing to machines, leaving higher value, more interesting work to humans e.g. driving home after work!

# Common AI Workloads

- Machine Learning: predictive models based on data and statistics (the foundation for AI)
- Anomaly Detection: detect unusual patterns or events (often rare events in the data)
- Computer Vision: interpret visual input from cameras, images, videos
- Natural Language Processing (NLP): applications that can interpret written or spoken languages, and engage in conversations
- Knowledge Mining: extract information from data sources to create a searchable knowledge store

Real world solutions may use a combination of these workflows.

# Principles of Responsible AI

- Fairness - bias in the data may influence the result e.g. if biased loan offices only gave loans to specific groups of people, the AI model may repeat this bias
- Reliability & Safety - errors may cause harm e.g. self-driving cars
- Privacy and Security - data could be exposed e.g. senstive medical data
- Inclusiveness - solutions may not work for everyone e.g. visually impaired users will not benefit from an application without audit output
- Transparency - what data is used and how it is used should be declared, so people know whether they can trust the models
- Accountability - who is liable for decisions made by AI?  e.g. an innocent person is convicted due to incorrect facial recognition

# AI Services in Azure

- Azure Machine Learning - platform for training, deploying and managing machine learning models
- Cognitive Services - vision, speech, language, decision
- Azure Bot Service - develop and manage conversation bots
- Azure Cognitive Search - data extraction, enrichment, and indexings for intelligent search and knowledge mining

Services can be created in Azure, and are generally accessed via REST APS.

# Machine Learning

Creating a predictive model by finding relationships in data

There are two types of machine learning:

1. **Supervised**

   Training data includes known labels

   Types of supervised learning:

   - Regression - previous values provided to predict future values e.g. based on temperature, how many bikes will be used at my rental store?
   - Classification - data is used to classify a subject into a category e.g. whether a patient is at risk of diabetes based on clinical measurements. This will be output as a probability value, and we will need to ascertain a cutoff value for those who are high risk.


2. **Unsupervised**

   Training data is unlabelled.  Types:

   - Clustering - similar items are grouped together e.g. vehicles with similar emmissions and fuel efficiency.  May help sales and marketing people group clusters of customers in ways humans may not have seen.

## Model Training

- split the data into training and validation - keep some real-world data aside to test the model (usually train the model with 80% of the data)
- apply an algorithm to fit the training data to a model
- The trained model encapsulates the relationships in the data
- Use the model to generate predictions
- Use evauation metrics to test the predictions and evaluate the results
- repeat!

# Computer Vision

Applications:
 - image classification e.g. this vehicle is a taxi
 - object detection e.g. bus, car, cyclist
 - semantic segmentation - classify individual pixels to objects in the image e.g. to mask out a number plate, detect shape and size of a tumor in a medical scan
 - image analysis e.g. a person with a dog on the street (applies context to the image)
 - face detection and recognition
 - optical character recognition (OCR) - can be used to extract text from images

# Natural Language Processing (NLP)

 - Analyzing text - can work out predominant language, sentiment, key phrases, and entities e.g. France.  Can help analyze large amounts of unstructured data very quickly.
 - Speech recognition and Synthesis - provides speech-to-text (over 60 languages) and text-to-speech capabilities (with a variety of voices)
 - Conversational language understanding - can be used to trigger actions e.g. turn off a light
  





