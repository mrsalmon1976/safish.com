---
layout: post
title: Threading with Java
date: 2001-10-01 00:00:00
tags: [java]
published: true
---

Threads in Java can be very simple if you just stick to the basics. To run a thread in your class, you should 
implement the **Runnable** interface, and then place your thread code into the **start()**, **stop()** and **run()** 
methods. For example, you want to create a dialog that returns a value to the calling class:

```java
public class myClass extends Dialog implements Runnable {

    private Thread timer;      // class-wide reference to thread object

    // run method from Runnable interface - this method runs until a 
    // specified condition is true - so you would probably want to have 
    // another variable which checks, for example, that the user has clicked 
    // a Cancel or OK button
    public void run() {
        while (this.isVisible()) {
            try {
                // user has not yet closed the window - sleep and loop again
                Thread.currentThread().sleep(500);
            } 
            catch (InterruptedException ie) {
            }
        }
    }

    // method which will return the value - makes the dialog visible, starts 
    // the Thread, and then when the thread dies a result is returned
    public int setVisible() {
        this.show();
        this.start();
        return result;
    }

    // implemented from Runnable interface - initiates a new thread
    public void start() {
        timer = new Thread(this);
        timer.start();
    }
    
    // cleans up objects when the Thread completes
    public void stop() {
        timer = null;
    }

}
```

Even more simply, if you want to run a single line in your class as a thread, you can do the following (taking away the pain of implementing the Runnable interface):

```java
  public void doStuff() {
    Thread runner = new Thread() {
      public void run() {
         // do thread stuff here
      }
    };
    runner.start();
  }
```