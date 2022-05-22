---
layout: post
title: Dynamic images with ASP.NET
date: 2004-08-06 00:00:00
tags: [asp.net]
published: true
---

Creating dynamic images with ASP.NET is simple using the System.Drawing namespaces:

*WebForm1.aspx*

```html
<%@ Page language="c#" Codebehind="WebForm2.aspx.cs" Inherits="WebApplication1.WebForm1" %>
```

*WebForm1.aspx.cs*

```csharp
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

...

private void Page_Load(object sender, System.EventArgs e) {
  Response.Clear();
  int height = 100;
  int width = 200;
  Bitmap bitmap = new Bitmap(width, height, PixelFormat.Format64bppArgb);
  // set up encoding options
  EncoderParameters encoderParams = new EncoderParameters();
  long[] quality = new long[1];
  quality[0] = 90;	// valid values 0 to 100
  EncoderParameter encoderParam = new EncoderParameter(Encoder.Quality, quality);
  encoderParams.Param[0] = encoderParam;
  ImageCodecInfo info = this.GetEncoderInfo();
  // get graphics context
  Graphics graphics = Graphics.FromImage(bitmap);
  // set alias and color to fill with
  graphics.SmoothingMode = SmoothingMode.AntiAlias;
  graphics.Clear(Color.RosyBrown);
  // create borders around the image
  graphics.DrawRectangle(Pens.White, 1, 1, width - 3, height - 3);
  graphics.DrawRectangle(Pens.Black, 1, 1, width, height);
  // write some text to the image
  graphics.DrawString("This is a test image!", new Font("Arial", 12, FontStyle.Regular), SystemBrushes.WindowText, new PointF(30,50));
  // send the image to the users browser
  Response.ContentType = info.MimeType;
  bitmap.Save(Response.OutputStream, info, encoderParams);
  // clean up
  graphics.Dispose();
  bitmap.Dispose();
  Response.End();
}

/// 
/// Gets ImageCodecInfo for JPEG images.
/// 
/// ImageCodecInfo object for encoding JPEG images
private ImageCodecInfo GetEncoderInfo() {
  ImageCodecInfo jpegEncoder = null;
  ImageCodecInfo[] encoders = ImageCodecInfo.GetImageEncoders();
  foreach (ImageCodecInfo encoder in encoders) {
    if (String.Compare(encoder.MimeType, "image/jpeg", true) == 0) {
      jpegEncoder = encoder;
      break;
    }
  }
  encoders = null;
  return jpegEncoder;
}
```

*Simpler example creating a gif:*

```csharp
int width = 700;
int height = 500;
Bitmap bitmap = new Bitmap(width, height);
Graphics g = Graphics.FromImage(bitmap); 
g.FillRectangle(new SolidBrush(Color.Yellow), 0, 0, width, height);
g.DrawString("This is a dynamic image:", new Font("Arial", 8), new SolidBrush(Color.Black), new PointF(10,10));
Response.ContentType = "Image/GIF";
bitmap.Save(Response.OutputStream, System.Drawing.Imaging.ImageFormat.Gif);
```