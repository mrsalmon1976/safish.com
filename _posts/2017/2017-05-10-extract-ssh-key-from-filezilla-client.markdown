---
layout: post
title: Extract SSH Key from Filezilla Client
date: 2017-05-10 15:52:00
tags: [filezilla]
published: true
---

I always forget this, so I'm documenting it here for myself. If you make SFTP connections from automated scripts or within a program, you really want to be supplying the SSH key.

On Windows, this can be extracted by doing the following:

- Open registry editor (regedit.exe)
- Go to HKEY_CURRENT_USER\Software\SimonTatham\PuTTY\SshHostKeys
- All the keys are stored, with types, on the right hand side under the SshHostKeys folder. The Name of each entry contains the host.
- Delete the key for the host you're looking for, and reconnect using Filezilla. It should supply you with a challenge response with the key and value for future use. In code, you will use a combination of the Hostkey algorithm and the fingerprint. So, for this response from FileZilla:
	![SSHKey!](../assets/img/2017/sshkey.png "sshkey.png")

In code this would be referenced as:

```
SshHostKeyFingerprint = "ecdsa-sha2-nistp384 384 b1:88:d6:eb:83:18:7e:80:77:9f:ef:xx:xx:xx:xx:xx"
```

You may want to confirm this key with the owner of the source system!


	
