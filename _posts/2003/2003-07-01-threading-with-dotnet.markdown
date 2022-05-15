---
layout: post
title: Threading with .NET
date: 2003-07-01 00:00:00
tags: [.net,c#]
published: true
---

Threads are very easy to use with C#. In this example I use a thread to ensure that a connection to a database is closed correctly (merely closing a connection in a method was not always successful as that connection was sometimes still busy when the Close() method line was processed).

```csharp
  // this is the public method called to close the connection
  public void CloseConnection() {
    // create a new thread instance providing the name of the threaded method
    Thread t = new Thread(new ThreadStart(CloseConnectionThread));
    t.Start();
  }
	
  // private method which actual controls the threaded attemps to close the 
  // database connection
  private void CloseConnectionThread() {
    Boolean closed = false;
    String delim = "-------------------------------------------------------";
    int i = 0;  // counter to prevent deadlock
    while(!closed) {
      try {
        // attempt to close the connection again
        connADO.Close();
        Console.WriteLine("Connection closed.");
        closed = true;
      }
      catch (System.Exception se) {
        // increment counter variable
        i++;
        // after 1000 iteration stop trying and write error to console
        if (i > 1000) {
          closed = true;
          Console.WriteLine("Failed to close connection after 1000 attempts." + 
		    delim + se.Message + delim);
        }
      }
    }
  }
```

## Threading with components

Threading with components is a little more complicated as method calls cannot be made to components by any thread other than the thread the main form is running in. However, this can be circumvented with the use of delegates. This is depicted in the following example, where a delegate in the BeginInvoke method to pass values to a method which adds nodes to a TreeView control.

```csharp
using System;
using System.Windows.Forms;
using System.Drawing;
using System.Threading;

namespace matt_test {
	
  // delegate used to pass arguments using the BeginInvoke method
  public delegate void ThreadEventDelegate(object sender, ThreadEventArgs e);
	
  public class test : Form {

    private TreeView tv = null;
    private ThreadEventDelegate onTreeViewElement;
    private bool running = false;

    public test() : base() {
      // initialise the form
      this.Size = new Size(400,400);
      tv = new TreeView();
      tv.Size = new Size(300,300);
      this.Controls.Add(tv);
      Button b = new Button();
      b.Location = new Point(310,20);
      b.Click += new System.EventHandler(this.event_Clicked);
        this.Controls.Add(b);
      // create the delegate
      onTreeViewElement = new ThreadEventDelegate(populateTreeView);
      // show as dialog box
      this.ShowDialog();
    }
  
    // does the actual work of running through the counter 
    private void workMethod() {
      // start updating the treeview
      tv.BeginUpdate();
      tv.Nodes.Clear();
      // loop through items, calling BeginInvoke method which in turns 
      // calls the populateTreeView method
      for (int i=0; i<3000; i++) {
        String str = Convert.ToString(i);
        BeginInvoke(onTreeViewElement, new object[] {
          this, new ThreadEventArgs(str)
          }
        );
      }
      // finish updating
      tv.EndUpdate();
      running = false;
      Console.WriteLine("Parse complete.n");
    }
  
    // populates the tree view adding a node with each BeginInvoke call
    private void populateTreeView(object sender, ThreadEventArgs e)	{
      string s = e.MyProperty;
      TreeNode n = new TreeNode(s);
      tv.Nodes.Add(n);
    }
  
    private void event_Clicked(object sender, System.EventArgs e) {
      // exit if already running
      if (running) return;
      // set parsing flag to true
      Console.WriteLine("Starting parse....");
      running = true;
      // run the thread
      Thread t = new Thread(new ThreadStart(workMethod));
      t.Start();
    }
  
    public static void Main(string[] args) {
      new test();
    }
  }
  
  // event argument class which is used to store info used to build the 
  // nodes
  public class ThreadEventArgs : EventArgs {
  
    public String MyProperty = "";
  
    public ThreadEventArgs(String text) {
      this.MyProperty = text;
    }
  }
}
```