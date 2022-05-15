---
layout: post
title: MySql blobs with PHP
date: 2003-06-12 00:00:00
tags: [mysql,php]
published: true
---

## Inserting

```php
  <HTML>
  <HEAD>
  <TITLE>PHP File Upload Test</TITLE>
  </HEAD>
  <BODY>
  <?
  //check for file upload
  if($submit && $file_data != "none") {
    echo "Uploaded file: $file_data";
	$file_data_name = $HTTP_POST_FILES['userfile']['name'];
	$file_data_size = $HTTP_POST_FILES['userfile']['size'];
	$file_data_type = $HTTP_POST_FILES['userfile']['type'];
    mysql_connect("host","username","password");
    mysql_select_db("dbname");
    $data = addslashes(fread(fopen($file_data, "r"), filesize($file_data)));
    $query = "INSERT INTO binarytable(id, alttext, bin_data, filename," . 
		" filesize, filetype) VALUES ('null', '$file_data_name', '$data'," . 
		" '$file_data_name', '$file_data_size', '$file_data_type')";
    $rs = mysql_query($query);
    unlink($file_data);
    print("Local File: $file_data <BR>n");
    print("Name: $file_data_name <BR>n");
    print("Size: $file_data_size <BR>n");
    print("Type: $file_data_type <BR>n");
    print("<HR>n");
  }
?>
<FORM ENCTYPE="multipart/form-data" METHOD="post">
<INPUT TYPE="hidden" NAME="MAX_FILE_SIZE" VALUE="1000000">
<INPUT NAME="file_data" TYPE="file">
<INPUT TYPE="submit" name="submit" VALUE="Upload">
</FORM>
</BODY>
</HTML>
```

## Retrieving

```php
<?
  if($id) {
    @mysql_connect("host","user","password");
    @mysql_select_db("dbname");
    $sql = "SELECT bin_data, filetype FROM binarytable WHERE id = '$id'";
    $rs = @mysql_query($query);
    while($d = mysql_fetch_array($rs)) {
      $data = $d["bin_data"];
      $type = $d["filetype"];
    }
    Header("Content-type: $type");
    echo $data;
  }
?>
```