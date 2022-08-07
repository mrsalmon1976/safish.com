---
layout: post
title: Unit Testing and DateTime Comparisons
date: 2010-08-26 11:51:00
tags: [.net]
published: true
---

One thing I've found annoying for the long time, is trying to assert DateTime equality when unit 
testing, particularly when the DateTimes have been parsed from strings in the underlying method.  
Two DateTime constructs, despite being identical in terms of their values, often won't assert as 
being equal and your unit test fails.  As such, you end up doing other sorts of tests, for 
example checking the individual values.

To help test dates, what I've done is created a helper class for asserting two dates are 'equal', to a specifed level of precision:

```csharp
public static class AssertHelper
{
    /// 

    /// Asserts that two dates are equal by checking the year, month, day, 
    /// hour, minute, second and millisecond components.
    /// 

    /// The current date
    /// 
    public static void AreDatesEqual(DateTime expected, DateTime actual, DateTimePrecision precision)
    {
        if (precision >= DateTimePrecision.Year && expected.Year != actual.Year)
        {
            throw new NUnit.Framework.AssertionException("Year in dates do not match as expected.");
        }
        if (precision >= DateTimePrecision.Month && expected.Month != actual.Month)
        {
            throw new NUnit.Framework.AssertionException("Month in dates do not match as expected.");
        }
        if (precision >= DateTimePrecision.Day && expected.Day != actual.Day)
        {
            throw new NUnit.Framework.AssertionException("Day in dates do not match as expected.");
        }
        if (precision >= DateTimePrecision.Hour && expected.Hour != actual.Hour)
        {
            throw new NUnit.Framework.AssertionException("Hour in dates do not match as expected.");
        }
        if (precision >= DateTimePrecision.Minute && expected.Minute != actual.Minute)
        {
            throw new NUnit.Framework.AssertionException("Minute in dates do not match as expected.");
        }
        if (precision >= DateTimePrecision.Second && expected.Second != actual.Second)
        {
            throw new NUnit.Framework.AssertionException("Second in dates do not match as expected.");
        }
        if (precision >= DateTimePrecision.Millisecond && expected.Millisecond != actual.Millisecond)
        {
            throw new NUnit.Framework.AssertionException("Millisecond in dates do not match as expected.");
        }


    }
}

public enum DateTimePrecision
{
    Year = 0,
    Month = 1,
    Week = 2,
    Day = 3,
    Hour = 4,
    Minute = 5,
    Second = 6,
    Millisecond = 7
}
```

This effectively allows me to unit test that the dates were close enough, without worrying to much about the exact equality.

This solution, although working, somehow feels dirty. I'd love to know if anyone else has any better solutions for unit testing date equality in .NET.
