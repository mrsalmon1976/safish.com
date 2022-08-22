---
layout: post
title: Resolve Mixed Content Warnings with WordPress and the Enfold Theme
date: 2018-05-03 11:20:00
tags: [wordpress]
published: true
---

I needed to move a WordPress site to HTTPS. The certificate was installed, and the site was being correctly served over HTTPS, but I was getting mixed content warnings, as many of the images were being loaded over http. There are many sites that give the full rundown, but nothing worked for me for the Enfold theme.

This site: [https://managewp.com/blog/wordpress-ssl-settings-and-how-to-resolve-mixed-content-warnings](https://managewp.com/blog/wordpress-ssl-settings-and-how-to-resolve-mixed-content-warnings) - can be used to set up HTTPS from start to finish

This site: [https://isabelcastillo.com/mysql-wordpress-http-to-https](https://isabelcastillo.com/mysql-wordpress-http-to-https) - led me to the solution

Once the site was set up for https, I had to run the following four queries against the WordPress database:

```php
UPDATE wp_posts 
SET    post_content = ( Replace (post_content, 'src="http://', 'src="//') )
WHERE  Instr(post_content, 'jpeg') > 0 
    OR Instr(post_content, 'jpg') > 0 
    OR Instr(post_content, 'gif') > 0 
    OR Instr(post_content, 'png') > 0;

UPDATE wp_posts
SET   post_content = ( Replace (post_content, "src='http://", "src='//") )
WHERE  Instr(post_content, 'jpeg') > 0 
    OR Instr(post_content, 'jpg') > 0 
    OR Instr(post_content, 'gif') > 0
    OR Instr(post_content, 'png') > 0;

UPDATE wp_postmeta
SET    meta_value = ( Replace (meta_value, 'src="http://', 'src="//') )
WHERE  Instr(meta_value, 'jpeg') > 0 
    OR Instr(meta_value, 'jpg') > 0 
    OR Instr(meta_value, 'gif') > 0 
    OR Instr(meta_value, 'png') > 0;

UPDATE wp_postmeta
SET    meta_value = ( Replace (meta_value, "src='http://", "src='//") )
WHERE  Instr(meta_value, 'jpeg') > 0 
    OR Instr(meta_value, 'jpg') > 0 
    OR Instr(meta_value, 'gif') > 0 
    OR Instr(meta_value, 'png') > 0;
```
	
