---
layout: post
title: Git Cheat Sheet
date: 2014-02-24 19:22:00
tags: [git]
published: true
---

We're switching to git (on github.com) at the moment, and I really wanted to use it properly instead of just relying on the GIU clients. I decided to learn it using the command-line, and I found this excellent tutorial online which really helped me understand some of the fundamentals: http://www.sbf5.com/~cduan/technical/git/.

This article contains my basic cheat sheet for Git, which more or less follows the general workflow when using a git repo.

| Command                                                    | Description                                                                                                                                        |
|------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| git init                                                   | Initialises a new git repository in the current folder.                                                                                            |
| git clone https://myrepo.com                               | Clones and initialises a remote git repository locally in the current folder - adds a remote repository reference named "origin".                  |
| git log                                                    | View log changes.                                                                                                                                  |
| git add .                                                  | Recursively adds all changes to the repository.                                                                                                    |
| git commit --dry-run                                       | See what changes will be committed before actually running git commit.                                                                             |
| git commit -m "My message"                                 | Commits changes to the repository.                                                                                                                 |
| git branch                                                 | Get a list of local branches, with a star next to the current head.                                                                                |
| git branch branch-name base                                | Creates a new branch based on an existing branch e.g. git branch test-branch HEAD.                                                                 |
| git checkout branch-name                                   | Switches to a new branch and updates the local folder with the files from that branch.                                                             |
| git fetch origin                                           | Retrieves remote changes and updates remote heads.                                                                                                 |
| git pull origin                                            | Pulls all remote changes (origin can be replaced with a URL, for example).                                                                         |
| git pull --rebase origin                                   | Pulls all remote changes but baselines them BEFORE your local changes, so your changes move on top of what everybody else has already contributed. |
| git push origin HEAD                                       | Pushes all changes back to the repository origin.                                                                                                  |
| git clone --branch xyz https://github.com/MyOrg/MyRepo.git | Clone a specific tag from a remote repo.                                                                                                           |
| git mv MyFolder SubFolder                                  | Moves MyFolder into SubFolder.                                                                                                                     |

To prevent yourself from having to enter credentials with each command-line entry, you can configure it to use a local store with the 
following command: `git config credential.helper store` - this will result in one request for user credentials and then no more.

