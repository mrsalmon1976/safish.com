---
layout: post
title: Environment aware script tags with .net 6
date: 2023-04-16 16:24:00
tags: [.net]
published: true
---

When writing .NET Core+ web applications, you will want your JavaScript files to be unminified in development, and minified when you release to production.  You can use the "environment" tag helper to distinguish between the two, but this adds unnecessary noise and it's too easy to change one and forget the corresponding dev/prod reference.

To make this easier to read/maintain, I use a [Tag Helper](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/tag-helpers/intro?view=aspnetcore-7.0) to consolidate this into a single line.

First, make sure tag helpers are supported in your *_ViewImports.cshtml* (make sure this file is in the root of your Views folder).

```c#
@using YourNameSpace.TagHelpers
@addTagHelper *, Microsoft.AspNetCore.Mvc.TagHelpers
@addTagHelper *, YourAssemblyName
```

The tag helper class can be created as follows:

```c#
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Razor.TagHelpers;
using SftpSchedulerService.Utilities;
using System.Net.Http;
using System.Text;

namespace SftpSchedulerService.TagHelpers
{
    [HtmlTargetElement("environment-script")]

    public class EnvironmentScriptTagHelper : TagHelper
    {
        private readonly IWebHostEnvironment _environment;
        private HttpContext? _httpContext;

        public EnvironmentScriptTagHelper(IWebHostEnvironment environment
            , IHttpContextAccessor httpContextAccessor) 
        {
            _httpContext = httpContextAccessor.HttpContext;
            _environment = environment;
            
            this.Src = "";
            this.ProdSuffix = ".min.js";
            this.DevSuffix = ".js";
            this.AppendAppVersion = true;
        }

        public string Src { get; set; }

        public string ProdSuffix { get; set; }

        public string DevSuffix { get; set; }

        public bool AppendAppVersion { get; set; }  

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            string src = this.Src;
            if (_httpContext != null && !String.IsNullOrEmpty(src) && src.StartsWith("~")) 
            {
                src = _httpContext.Request.PathBase + src.Substring(1);
            }

            if (_environment.IsDevelopment() && src.EndsWith(this.ProdSuffix))
            {
                src = src.Replace(this.ProdSuffix, this.DevSuffix);
            }
            else if (_environment.IsProduction() && !src.EndsWith(this.ProdSuffix))
            {
                src = src.Replace(this.DevSuffix, this.ProdSuffix);
            }

            // append application version to the script so caching doesn't happen across releases
            if (this.AppendAppVersion)
            {
                src = $"{src}?v={AppUtils.Version}";
            }

            output.TagName = "script";
            output.TagMode = TagMode.StartTagAndEndTag;
            output.Attributes.Add("src", src);
        }
    }
}

```

This has the following properties / attributes / notable parts:

* Src - the path to the source file (can be prefixed with a tilde just like using the script tag)
* ProdSuffix - used to signify the suffix of a production file (defaults to ".min.js")
* DevSuffix - used to signify the suffix of a development file (defaults to ".js")
* AppendAppVersion - this is specific to my application, but if set to true (the default value), a static helper method is called to append the application version to the src file which is useful to avoid caching issues with new releases

In markup, this is declared as:

```html
<environment-script src="~/plugins/vue/vue.global.js" prod-suffix=".prod.js"></environment-script>
<environment-script src="~/js/common.js"></environment-script>
```

which renders to the browser as:

```html
<script src="/plugins/vue/vue.global.js?v=1.0.0"></script>
<script src="/js/common.js?v=1.0.0"></script>
```


