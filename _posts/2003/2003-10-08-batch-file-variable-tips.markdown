---
layout: post
title: Batch File Variable Tips
date: 2003-10-08 00:00:00
tags: [.net,c#]
published: true
---

## Catching unknown / dynamic variables

If you want to run another batch command and want to pass it all the variables your batch file receives, you can use a loop to catch all the variables into a single string, and then open the other batch file with those same variables:

```dos
  @ECHO OFF
  SET tmp=SecondBatchFile
  GOTO LOOPFILES

  :LOOPFILES
    @ECHO OFF
    SET tmp=%tmp% %1
    SHIFT
    IF %1. == . GOTO END
    GOTO LOOPFILES
  :END
  ECHO ON
  %tmp%
```

## Dates and Times

On Windows NT, use the %time% and %date% values to manipulate dates and times.

```dos
SET hour=%time:~0,2%
SET min=%time:~3,2%
SET sec=%time:~6,2%

ECHO %TIME%
ECHO %hour%:%min%:%sec%
```