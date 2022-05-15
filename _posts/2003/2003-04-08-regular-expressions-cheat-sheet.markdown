---
layout: post
title: Regular Expressions Cheat Sheet
date: 2003-04-08 00:00:00
tags: []
published: true
---

| <	| A less than at the start of the string matches the start of a line. |
| %	| A percent sign at the start of the string matches the start of a line. |
| ^	| A circumflex at the start of the string matches the start of a line. |
| .	| A period matches any character. |
| *	| An asterisk after a string matches any number of occurrences of that string followed by any characters, including zero characters. For example, bo* matches bot, bo and boo but not b. |
| $	| A dollar sign at the end of the expression matches the end of a line. |
| >	| A greater than at the end of the expression matches the end of a line. |
| ?	| A question mark matches any single character. |
| @	| An at sign after a string matches any number of occurrences of that string followed by any characters, including zero characters. For example, bo@ matches bot, boo, and bo. |
| +	| A plus sign after a string matches any number of occurrences of that string followed by any characters, except zero characters. For example, bo+ matches bot and boo, but not b or bo. |
| |	| A vertical bar matches either expression on either side of the vertical bar. For example, bar|car will match either bar or car. ~ A tilde matches any single character that is not a member of a set. |
| [ ]	| Characters in brackets match any one character that appears in the brackets, but no others. For example [bot] matches b, o, or t. |
| [^]	| A circumflex at the start of the string in brackets means NOT. Hence, [^bot] matches any characters except b, o, or t. [-] A hyphen within the brackets signifies a range of characters. For example, [b-o] matches any character from b through o. |
| [-]	| A hyphen within the brackets signifies a range of characters. For example, [b-o] matches any character from b through o. |
| { }	| Braces group characters or expressions. Groups can be nested, with a maximum number of 10 groups in a single pattern. . For the Replace operation, the groups are referred to by a backslash and a number according to the position in the ?Text to find? expression, beginning with 0. For example, given the text to find and replacement strings, Find: {[0-9]}{[a-c]*}, Replace: NUM1, the string 3abcabc is changed to NUMabcabc. |
| \ | A backslash before a wildcard character tells the IDE to treat that character literally, not as a wildcard. For example, \^ matches ^ and does not look for the start of a line. |