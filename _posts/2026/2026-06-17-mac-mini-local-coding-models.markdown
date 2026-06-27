---
layout: post
title: Running coding models on an Apple Mac mini M4
date: 2026-06-17 21:29:00
tags: [apple,ai]
published: true
---

With the price of tokens set to soar, and coding with AI now the norm, running local models is becoming increasingly important to minimise costs.  

I use Claude Code on a Windows machine as my primary development tool, with Gemini Flash for reviews.  However, if I do start hitting limits, I use local models for simpler tasks.

I have a Mac Mini M4 with 24GB of RAM, but hosting and running coding models is not completely straight-forward.  The following combinations have worked for me:

# Mac Mini Settings

Run this command in your Mac's terminal to raise the GPU memory ceiling to 20 GB (20,480 MB).

```
sudo sysctl iogpu.wired_limit_mb=20480
```

# oMLX Settings

- Memory guard: Aggressive

# oMLX, Claude Code, Gemma4

**Software**

- *Server*: [oMLX](https://omlx.ai) running on my Mac Mini
- *Model*: gemma-4-E4B-it-MLX-4bit / gemma-4-12B-it-OptiQ-4bit
- *Coding Tool*: Claude Code (configured per below)

**Startup Script** 

If I want to switch to a local model, I use this script to configure Claude in a single console session.

```powershell
$model = "gemma-4-12B-it-OptiQ-4bit"

# Redirect Claude Code to your local Ollama server
$env:ANTHROPIC_BASE_URL = "http://192.168.0.174:8000"
$env:ANTHROPIC_API_KEY = ""
$env:ANTHROPIC_AUTH_TOKEN = ""

# Map Claude Code's model tier requests to your local model name
$env:ANTHROPIC_DEFAULT_SONNET_MODEL = $model
$env:ANTHROPIC_DEFAULT_HAIKU_MODEL = $model
$env:ANTHROPIC_DEFAULT_OPUS_MODEL = $model
$env:ANTHROPIC_MODEL = $model
$env:API_TIMEOUT_MS = "3000000"
$env:CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC = "1"

$env:DISABLE_AUTOUPDATER = "1"
$env:DISABLE_TELEMETRY = "1"
$env:DISABLE_ERROR_REPORTING = "1"

# launch Claude
claude --bare --exclude-dynamic-system-prompt-sections --strict-mcp-config --tools "Bash,Read,Edit,Write,Glob,Grep,WebSearch,WebFetch"
```

