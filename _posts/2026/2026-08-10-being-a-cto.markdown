---
layout: post
title: Being a Technical IT Leader
date: 2026-08-10 08:31:00
tags: [leadership]
published: true
---

When leading a large technical team, I've found that all things are circular.  As you slowly tweak for people and problems, you often find yourself implementing "fixes" that you had before, but slowly diverged away from.  This list serves as a reminder of all the things that actually work - and should be reviewed as a reminder to myself regularly!

## People (In Your Team)

 - 5x and 10 developers are real.  Don't compromise on hiring.  You won't always get it right - but if you have doubts about a candidate, trust your gut and spend the time digging into why
 - Spend time encouraging and helping the best employees.  
 - Also spend time putting pressure on the worst employees.  
 - Don't let resentment fester in a team
 - Build a shared WHY.  Why are we here?  What are we trying to do?  What is our key focus as an IT team for Company X?
 - Get to know people.  You don't have to be their friend - but remembering what motivates people is critical to success.  People like feeling like a name, not a number.
 - Portray positivity.  You're the leader.  Sometimes you don't feel like it - but do your best to not be a downer.  It rubs off.
 - Don't micromanage.  Only intervene when teams are not meeting their goals.  Free-thinking people move faster.
- Track and celebrate your accomplishments
- Meet your direct reports at least once a month (or more if they require it)

## People (Not In Your Team)

- Ask them what they LIKE about something your team have built, and then listen for the negatives.
- Align often on your core goals.  It's easy to get sucked into things that are not important.  Remind yourself: why are we doing this?
- Track and celebrate your accomplishments!

## Development

- Spend timing building and documenting both coding standards and patterns, and protect those standards.  Implement archi tests to protect these.
- Beware the prototype.  Never go live with a prototype without coming back to clean up the mess.  It will grow.
- Remember the 80/20 rule.  Don't try and be perfect - just strive for the 80%.
- Own your mess.  No-one else is going to clean it for you - be proactive about sweeping.
- KISS.  We've all added tech because it seems like a good idea at the time.  Keep it simple, stupid.  
- More services = more dependencies = more deployment pipelines = more complication.  Scale out when you NEED to - just build it internally in a modular way so it CAN be scaled out later.
- Always review the business value of what you are doing.  You'll be surprised how often the answer is "very little".
- Avoid knee-jerk decisions that are based on fear or feedback from one person.
 - Automate early.  You don't need complex deployment pipelines, but you SHOULD invest in single-click deployments right at the beginning of your project.
 - Unit testing and Integration testing is not optional.  Every complex business process should be accompanied by integration tests across distributed systems.

## Process

- Don't skimp on planning.  
- Break problems down until you can't break them down any more. The more you break them into pieces, the more complexity will be revealed.
- Hold retrospectives - for Sprints and for Projects.  Elevate a platform where you can critically view what went well, and what went badly. 

## Observability

 - Add logging to EVERTHING.  Local file logging and a centralised system.  Make the logs accessible to developers.
 - Implement global error handlers and make errors visible.  Add notifications of errors.
 - Implement metrics.  How do you know if something is getting better or worse, if you can't measure it?

 ## Problem Solving

 - Every problem should be tested against more than one solution.  Deliberately trying different ways of solving something often reveals optimisations for or flaws in what seems to be the best solution. 

 # Key Behaviours

 - Innovation
 - Identify whitespace - find hidden gaps, unmet needs, untouched opportunities
 - Execution - gather people and resources, and combine these to get things done
 - Communication - make high-level ideas stick: the ability to communicate complex ideas simply is critical 
 - Leadership - driving and getting buy-in for the shared WHY
 - Mindset makes the difference - how you deal with setbacks governs how your team deals with setbacks
 - Take copious notes, in a format that you can search and find them again.