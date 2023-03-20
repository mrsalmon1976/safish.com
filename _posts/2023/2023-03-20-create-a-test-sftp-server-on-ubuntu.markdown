---
layout: post
title: Create a test SFTP server on Ubuntu
date: 2023-03-20 11:46:00
tags: [ubuntu]
published: true
---

I'm working on a project to create an SFTP Scheduler, and needed an SFTP server to test with.  I work on Windows but have an Ubuntu virtual machine that 
I run through Hyper-V - and I didn't realise how easy it was to set up a test server.  For my future self, here are the steps:

1. Run Ubuntu virtual machine and log in.  The SFTP account will be a local user account, so create one now:

    ```bash
    sudo adduser sftp-test
    ```
Enter a password, and complete any of the other questions.  You now have an account you can test with - when the SFTP client logs in it will have access to the above user's home directory on the machine.

2. Install the SFTP server

    ```bash
    sudo apt install -y openssh-server
    ```

3. Run the server

    ```bash
    sudo service ssh start
    ```

4. Configure the client


![SFTP client configuration!](../assets/img/2023/sftp-client-config.png)

5. And that's it!

![SFTP connection!](../assets/img/2023/sftp-connected.png)


