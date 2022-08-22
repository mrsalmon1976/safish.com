---
layout: post
title: Web Site and Page Essentials
date: 2017-08-24 20:03:00
tags: []
published: true
---

Creating a web site is simple, but there are a lot of basic items to consider that are easy to forget but will trip you up in the lifetime of the web site. These lists should be revisited regularly.

**For your site as a whole**

1. Are JavaScript and CSS resources bundled and minimised?
2. While sitemaps are not as important as they used to be, if you have a complex site heirarchy or some pages are perhaps hidden behind posted forms, it may help your SEO to include a sitemap (sitemap.xml)
3. X-Frame-Options header
4. If possible, serve everything over HTTPS ([https://httpsiseasy.com/](https://httpsiseasy.com/))
5. Implement HSTS: [https://www.hanselman.com/blog/HowToEnableHTTPStrictTransportSecurityHSTSInIIS7.aspx](https://www.hanselman.com/blog/HowToEnableHTTPStrictTransportSecurityHSTSInIIS7.aspx)
6. Ensure all passwords are hashed, and allow users to reset passwords by send them an email
7. Error messages should be caught at a global level - don't reveal sensitive information when an error occurs
8. Create an appropriate robots.txt
9. Scan your site using [http://www.webpagetest.org](http://www.webpagetest.org)
10. Scan your site using [https://securityheaders.io/](https://securityheaders.io/)
11. Run your site through [https://gtmetrix.com/](https://gtmetrix.com/)
12. Optimize your images: [https://pnggauntlet.com/](https://pnggauntlet.com/)

**For every page**

1. Version numbers on CSS and JS include files - this will prevent new deploys from going wrong because users have cached copies of old files on their machines e.g. Myfile.js?version=1.0.4
2. SQL Injection attacks - have you parameterised all your queries? Dapper, maybe?
3. CSRF/XSRF Vulnerabilities - every page on your site (apart from the login screen) should compare the value of a form item AND a cookie to ensure they are the same cyrptographically secure number, otherwise authentication fails. For ASP.NET users, use the anti-forgery token.
4. Don't send any sensitive information over email e.g. passwords
5. Can the parameters be tampered with to reveal data the user should not be able to get to?

*Useful links*

- [https://www.troyhunt.com/hack-yourself-first-how-to-go-on/](https://www.troyhunt.com/hack-yourself-first-how-to-go-on/)

	
