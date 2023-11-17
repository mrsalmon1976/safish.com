---
layout: post
title: Preserve original filename when using Filebeat and Logstash
date: 2023-11-17 16:06:00
tags: [logstash,filebeat]
published: true
---

I am using [Logstash](https://www.elastic.co/logstash) and [Filebeat](https://www.elastic.co/beats/filebeat) to ship log files into a central repository.

Getting this set up is very easy, but I battled for a few hours to get the file name to be saved on the logstash server with the name the file had on the source server.  

In my scenario, I have two sources of logs - a web site and an API.  These are on load-balanced servers, so I want the log files copied to the central repository into specific folders, with their original file name prefixed with the host from where they came.

# Filebeat

The Filebeat configuration was the easy part - nothing complex here in the `filebeat.yml` file:

```
filebeat.inputs:
- type: filestream
  id: site-logs
  paths:
    - E:\Web\site.co.za\logs\*.log
  tags: ["site-logs"]
- type: filestream
  id: api-logs
  paths:
    - E:\Web\api.co.za\logs\*.log
  tags: ["api-logs"]

output.logstash:
  hosts: ["MYSERVER:5044"]
```
The `tags` are important - this is so you can differentiate them on the logstash side as different sources.

Run Filebeat as follows: `filebeat -e -c filebeat.yml`

# Logstash

Now we know we are getting files shipped across to Logstash.  Most references refer to the `source` event field, but this is no longer available in the latest version of Filebeat that I could see.  Instead, I noticed that the `log.file.path` contained the full original path of the log file.

This value can then be mutated into a new field as follows:

```
input {
  beats {
    port => 5044
  }
}

filter {
  if "api-logs" in [tags] or "site-logs" in [tags] {
    mutate {
      copy => { "[log][file][path]" => "[@metadata][filepath]" }
    }
    mutate {
      gsub => [ "[@metadata][filepath]", "[\\]", "|" ]
    }
    mutate {
      split  => { "[@metadata][filepath]" => '|' }
      add_field  => { "file_name" => '%{[@metadata][filepath][-1]}' }
    }
  }
}

output {
#  stdout { codec => rubydebug }
  if "site-logs" in [tags] {
    file {
      path => ["C:/LogStash/site/%{[host][name]}-%{[file_name]}"]
      codec => line { format => "%{message}" }
    }
  }
  
  if "api-logs" in [tags] {
    file {
      path => ["C:/LogStash/api/%{[host][name]}-%{[file_name]}"]
      codec => line { format => "%{message}" }
    }
  }
}
```

The process is therefore as follows:

- List for file beats on port 5044
- If a beat comes in with the `api-logs` or `site-logs` tag, then run mutations on it
- The mutations take the `log.file.path` value and split it by separator, using the ruby [-1] array index to get the last value in the array
- The file is then written out to `C:\LogStash\<source>\<hostName>-<originalFileName>` e.g. `C:\LogStash\api\MYSERVER-2023-11-14.log`
