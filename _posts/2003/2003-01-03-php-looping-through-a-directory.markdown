---
layout: post
title: PHP - Looping through a directory
date: 2003-01-03 00:00:00
tags: [php]
published: true
---

This function can be used to loop through the files in a directory, showing all it's folders and their subfolders:

```php
// windows style - needs to be changed for unix platform
$BASE_DIR = "C:\Inetpub\wwwroot"  

function get_folders($base) {
	global $BASE_DIR;
	$arr_files = array();
	if ($handle = opendir($base)) {
	    while (false !== ($file = readdir($handle))) { 
	        if ($file != "." && $file != ".." && is_dir("$base/$file")) { 
	        	$item = "<br>$base/$file";
	        	$item = str_replace($BASE_DIR, "", $item);
	        	if (substr($item, -1) != "/") {
	        		$item = "$item" . "/";
	        	}
	        	print $item;
	        	get_folders("$base/$file");
	        } 
	    }
	    closedir($handle); 
    }
    else {
    	trigger_error("Invalid directory: $base");
    }
}
```