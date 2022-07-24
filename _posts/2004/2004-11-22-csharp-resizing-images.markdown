---
layout: post
title: C# - Resizing images
date: 2004-11-22 00:00:00
tags: [c#]
published: true
---

The following function can be used to resize images on your machine. Note that this function works out the image format internally and creates a file of the same format. You may want to adjust this to output a file of a different format.

```csharp
/// <summary>
/// This function can be used to resize images, while retaining image quality 
/// that cannot be done when using the GetThumbnailImage method.
/// </summary>
/// <param name="sourceImgPath">Path to the source image</param>
/// <param name="outputImgPath">Path to the output image</param>
/// <param name="width">Width of the output image</param>
/// <param name="height">height of the output image</param>
/// <param name="quality">Quality (valid values 0 - 100)</param>
private void ResizeImage(string sourceImgPath, string outputImgPath, int width, int height, long quality) 
{
  ImageCodecInfo codecInfo = null;
  Bitmap bIn = new Bitmap(sourceImgPath, true);
  // get the correct encoder information
  Guid formatGuid = bIn.RawFormat.Guid;
  ImageCodecInfo[] encoders = ImageCodecInfo.GetImageEncoders();
  for(int i=0; i<encoders.Length; i++)
  {
    if (encoders[i].FormatID == formatGuid) 
    {
      codecInfo = encoders[i];
    }
  }    if (codecInfo == null) throw new Exception("Unable to find image encoder for file " + sourceImgPath);
  // now resize the image
  EncoderParameters encoderParams = new EncoderParameters(1);
  encoderParams.Param[0] = new EncoderParameter(Encoder.Quality, quality);
  Bitmap bOut = ScaleImage(bIn, width, height, quality);
  bOut.Save(outputImgPath, codecInfo, encoderParams);
  bIn.Dispose();
  bOut.Dispose();
}
```

The following scaling function is also required:

```csharp
private Bitmap ScaleImage(Bitmap bitmap, int width, int height, long quality) 
{
  Bitmap bOut = new Bitmap(width, height);
  Graphics g = Graphics.FromImage(bOut);
  g.SmoothingMode = SmoothingMode.HighQuality;
  g.InterpolationMode = InterpolationMode.HighQualityBicubic;
  g.DrawImage(bitmap, 0, 0, width, height); 
  g.Dispose();
  return bOut;
}
```