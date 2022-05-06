---
layout: post
title: Java - Handling XML Documents
date: 2002-06-19 00:00:00
tags: [java]
published: true
---

To retrieve values from an XML document, you need to import the following:

```java
  import javax.xml.parsers.*;
  import java.io.*;
  import org.w3c.dom.*;
  import javax.swing.*;
```
  
The text within elements is itself seen as a node, so to retrieve values from an XML document:

```java
  Document doc = null;
  try {
    DocumentBuilder builder = DocumentBuilderFactory.newInstance()
      .newDocumentBuilder();
    doc = builder.parse(new FileInputStream(file));
  }
  catch (Exception e) {
    throw new Exception(e.getMessage());
  }
  NodeList nodeList = doc.getElementsByTagName("tagname");
  for (int i=0; i<nodeList.getLength(); i++) {
    Node node = nodeList.item(i);    NodeList list = node.getChildNodes();
    System.out.println(list.item(0).getNodeValue());
  }
```

To save values to an xml document, you also need to import:

```java
  import javax.xml.transform.*;
  import javax.xml.transform.dom.*;
  import javax.xml.transform.stream.*;
```

Save the document using a Transformer object:

```java
  try {
    Transformer transformer = TransformerFactory.newInstance()
      .newTransformer();
    DOMSource source = new DOMSource(yourDocument);
    StreamResult result = new StreamResult(yourFile);
    transformer.transform(source, result);
  }
  catch (Exception e) {
    e.printStackTrace();
  }
```