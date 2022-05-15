---
layout: post
title: Binary/decimal conversions
date: 2003-02-21 00:00:00
tags: []
published: true
---

# Converting binary to decimal

Given the binary value 1000:

```
1000 
  = 1 * 2<sup>3</sup> + 0 * 2<sup>2</sup> + 0 * 2<sup>1</sup> + 0 * 2<sup>0</sup>
    = 2<sup>3</sup>
      = 8 (decimal)
```

# Converting decimal to binary

Given the decimal value 10:

```
10
  = 2<sup>3</sup> + 2<sup>1</sup> 
    = 1 * 2<sup>3</sup> + 0 * 2<sup>2</sup> + 1 * 2<sup>1</sup> + 0 * 2<sup>0</sup> 
      = 1010 (binary)
```

An easier way to work this out is, for example, given a decimal number of 11: 
 - divide the decimal number by 2, recording the quotient and remainder in the next row
 - rounding the quotient DOWN each time, until you have a quotient of 0.
 
|             | Quotient    | Remainder   |             |
| ----------- | ----------- | ----------- | ----------- |
|             | 11          |             |             |
| Repeat the procedure - divide by 2, record quotient and remainder in the next row   | 5        | 1        | 11/2 = 5 remainder 1        |
| Repeat again   | 2        | 1        | 5/2 = 2 remainder 1        |
| Repeat again   | 1        | 0        | 2/2 = 1 remainder 0        |
| Stop!  Quotient = zero   | 0        | 1        | 1/2 = 0 remainder 1        |

**Result:** (read from bottom up) Decimal value 11 = binary 1011
