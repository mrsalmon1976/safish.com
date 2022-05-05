---
layout: post
title: Java - Reading text files
date: 2002-04-23 00:00:00
tags: [java]
published: true
---

In order to read a text file, you can use the **BufferedReader** class in the **java.io** package. The following simple class starts up, 
reads a text file and prints each line to the screen, then closes the text file and exits.

```java
import java.io.*;

public class TestClass {
	
    BufferedReader br;
	
    public TestClass() {
        System.out.println("opening file");
        try {
            br = new BufferedReader(new FileReader("test.htm"));
            String s = "";
            while (s != null) {
                try {
                    s = br.readLine();
                    System.out.println(s);
                }
                catch (IOException ioe) {
                    System.out.println("IOException: " + ioe.getMessage());
                }
            }
            try {
                br.close();
            }
            catch (IOException ioe) { }
        }
        catch (FileNotFoundException fnfe) {
            System.out.println("Could not find file");
        }
    }
	
    public static void main(String[] args) {
        new TestClass();
    }
}
```
