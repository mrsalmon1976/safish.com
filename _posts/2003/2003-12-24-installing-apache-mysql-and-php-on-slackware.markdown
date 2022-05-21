---
layout: post
title: Installing Apache, MySQL and PHP on Slackware
date: 2003-12-24 00:00:00
tags: [apache,mysql,php]
published: true
---

This assumes that none of the above are installed. If they are remove them from your system if you are not sure they are working correctly.

## MySQL

1. Download MySQL from mysql.com.
2. Untar the downloaded file tar xzvf mysql_xx.tar.gz.
3. Go into the mysql_xxx folder created by the unzip process.
4. Run ./configure to configure the compilation.
5. Run make to compile MySQL.
6. Run make install to install MySQL.
7. Run mysql_install_db to initialise the database server.
8. Run safe_mysqld & to start the database server. The ampersand is required so that the command returns the console back to you. Since MySql 3.23 this often comes back with the following:
```
Starting mysqld daemon with databases from /usr/local/var
030508 16:00:00 mysqld ended
```
If you see this, there is a permissions problem which you need to sort out as indicated in the following step. If you do not get the "ended" message, you can skip the next step.

9. You will need to change ownership of the folder displayed in the first line of the above message. For the above message, the command would be chown -R mysql.mysql /usr/local/var/.
10. Try and start the database server again with safe_mysqld &.
11. Change the root password with mysqladmin -uroot -h'yourmachine' password 'yourpassword'. The -h option is for the host. It is optional but if you get a message along the lines of "connect to server at 'localhost' failed" you will need to put it in with the name of your machine.
12. You should be able to connect to the MySQL service now with mysql -uroot -p'yourpassword'. You will now be able to enter SQL commands terminated by a ';'. To exit the console, type 'q'.
13. To automatically start MySQL on system startup is dependant on your version of Linux:

**Slackware**

```shell
cp support-files/mysql.server /etc/rc.d
chmod +x /etc/rc.d/mysql.server
```

Edit your /etc/rc.d/rc.local file and add the following line to the end: /etc/rc.d/mysql.server start

**RedHat**

```shell
cp support-files/mysql.server /etc/rc.d/init.d
chmod +x /etc/rc.d/init.d/mysql.server
ln -s /etc/rc.d/init.d/mysql.server /etc/rc.d/rc3.d/S98mysql (if you boot into the console)
ln -s /etc/rc.d/init.d/mysql.server /etc/rc.d/rc5.d/S98mysql (if you boot into X Windows)
```

Edit your /etc/rc.d/rc.local file and add the following line to the end: /etc/rc.d/mysql.server start

## Apache 1.3.2x and PHP

Apache and PHP get compiled and installed together so that PHP can run as a module of Apache.

1. Extract apache in your source directory: tar zxvf apache_1.3.27.tar.gz
2. Extract php in your source directory: tar zxvf php-4.0.6.tar.gz
3. Go into the apache folder and run ./configure.
4. Go back and into the PHP folder and run

```
	./configure 
		--with-apache=../apache_1.3.27 
		--with-mysql 
		--enable-track-vars 
		--enable-ftp 
		--enable-inline-optimization 
		--enable-magic-quotes 
		--enable-xml 
		--with-db 
		--with-dom 
		--with-gettext 
		--with-regex=system 
		--with-xml 
		--with-zlib-dir=/usr/include
```
		
5. Compile PHP with make
6. Copy the binaries to the correct locations with make install
7. Move into the apache module and compile PHP into Apache as a module with ./configure --activate-module=src/modules/php4/libphp4.a
8. Compile Apache with make
9. Copy the Apache binaries to the correct places with make install.
10. Complete the process by configuring your httpd.conf file:
 - Add the line AddType application/x-httpd-php .php
 - Add the line AddType application/x-httpd-php .php3
 - Add index.php to the DirectoryIndex value e.g. DirectoryIndex index.php index.html
 - Restart the web server with the command apachectl restart
 - Create the file /usr/local/apache/htdocs/test.php and put in it. When connecting to the file (usually via http://localhost/test.php) you should see reams of PHP information.

## Apache 2.0.x and PHP

Download the archives and place them in /usr/src

```
tar xzvf httpd-2_0_NN.tar.gz
tar xzvf php-NN.tar.gz
cd httpd-2_0_NN
./configure --enable-so
make
make install
```

Apache 2.0 will now be available under /usr/local/apache2, configured with loadable module support and the standard MPM prefork.

```
cd ../php-NN
./configure --with-apxs2=/usr/local/apache2/bin/apxs 			--with-mysql 
			--enable-track-vars 
			--enable-ftp 
			--enable-inline-optimization 
			--enable-magic-quotes 
			--enable-xml 
			--with-db 
			--with-dom 
			--with-gettext 
			--with-regex=system 
			--with-xml 
			--with-zlib-dir=/usr/include
make
make install
```

If you decide to change your configuration options after installation, you only need to repeat the last three steps. You only need to restart apache for the new module to take effect. A recompile of Apache is not needed.

Setup your php.ini with cp php.ini-dist /usr/local/lib/php.ini.

Edit your httpd.conf to load the PHP module. For PHP 4:

```apache
  LoadModule php4_module modules/libphp4.so
```

For PHP 5:

```apache   
  LoadModule php5_module modules/libphp5.so
```

Finally, ensure Apache parses PHP by maaking sure the following line is present (if not - add it). The .phps line is optional and is used to display PHP source.

```apache
  AddType application/x-httpd-php .php .phtml
  AddType application/x-httpd-php-source .phps
```

Start Apache with 

```shell
/usr/local/apache2/bin/apachectl start.
```
