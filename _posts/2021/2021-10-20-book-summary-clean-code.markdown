---
layout: post
title: Book Summary - Clean Code
date: 2021-10-20 07:34:00
tags: [booksummary]
published: true
---

This article is my personal summary (for future reference) of Robert Martin's book [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882) (most of it, anyway).

**Foreword**

Making your code readable is as important as making it executable.

**Chapter 1 – Clean Code**

- They had rushed the product to market and had made a huge mess in the code. As they added more and more features, the code got worse and worse until they simply could not manage it any longer. It was the bad code that brought the company down.

**Chapter 2 – Meaningful Names**

- Names are important. Names should be meaningful, contextual, and clearly communicate intent. When editing code, if a name slows you down...rename!

**Chapter 3 – Functions**

- Functions should be short and only do one thing
- Follow one level of abstraction - you should not have mixed levels of detail in a single function.
- Switch statements - avoid except to create polymorphic objects
- Arguments should almost never exceed two - they take a lot of conceptual power and testing all combinations of 3 or more arguments is tedious
- Use exceptions instead of error codes
- Don't Repeat Yourself (DRY)
- You know you are working on clean code when each routine turns out to be pretty much what you expected

**Chapter 4 – Comments**

- Comments are not maintained over time, and so should be used sparingly and only when you are unable to express yourself with code

**Chapter 5 – Formatting**

- Keep line spaces between concepts
- Keep related functions close to each other, and where possible, parent functions before child functions. This minimises the need for future programmers to scroll up and down looking for implementation
- Instance variables at the top of the file, all other variables where they are needed
- Spaces between assignment operators
- Consistent indentation
- Team rules over personal opinions!

**Chapter 6 – Objects and Data Structures**

- Adding public getters/setters makes for a confusing interface - objects should hide their data behind abstractions
- [Law of Demeter](https://en.wikipedia.org/wiki/Law_of_Demeter) - a module should not know about the innards of the objects it manipulates (works hand in hand with the single-responsibility principle when creating objects)
- One needs to make a tradeoff: choose objects when you want the flexibility to add new data types; choose data types and procedures when you want the flexibility to add new behaviours

**Chapter 7 – Exception Handling**

- use exceptions rather than return codes
- define exception classes in terms of a caller's need, and abstract away the complexity of error handling in the custom exception class
- try not to return null (null returns result in obvious bugs as well as messy code which need to check for the null)

**Chapter 8 – Boundaries**

- don't pass standard types with too much functionality around your application (e.g. a shared Map with a clear() method could cause trouble) - rather create your own types with a limited interface that enforces correct behaviour and makes for more readable code
- code at boundaries needs clear separation and tests that define expectations - it's a good idea to wrap 3rd party libraries into your own "preferred" API - it makes your code more readable AND means you can switch the 3rd party library out with less impact
- this is also particularly useful with library upgrades (fewer places to fix on breaking changes)

**Chapter 9 – Unit Tests**

- keep your tests clean - this is production code too! Tests evolve with the changing code, and so need to also be maintainable
- single concept per test (try not to mix too many asserts in a single test)
- FIRST
	- Fast
	- Independent (tests should be able to run in any order and not be dependent on any other test)
	- Repeatable
	- Self-validating (should have a boolean output i.e. should either pass or fail)
	- Timely (should be written slightly before the production code)

**Chapter 10 – Classes**

- single responsiblity principle (SRP)
- aim for high cohesion - all methods should use at least one of the instance variables
- organise classes for change by minimising the responsibilities - if something changes we should be needing to change one area only
- isolate from change using the Dependency Inversion Principle - classes should depend on concepts rather than implementations, allowing us to easily switch out underlying functionality without changing the implementation of the class itself (use interfaces and abstract classes)

**Chapter 11 – Systems**

- separate construction from use to decouple the details of how to build items from the application (use Dependency Injection); an object should not take responsibility for instantiating dependencies itself
- cities don't build 6-lane highways from the start, similarly software projects should not overengineer the application until there is a need; implement only today's stories, then refactor and expand the system to implement new stories tomorrow
- use standards when they add demonstrable value (not for the sake of them)
- always use the simplest thing that can possibly work

**Chapter 12 – Emergence**

Kent Beck's rules of simple design:

- Simple Design Rule #1: Runs all tests - systems that aren't testable aren't verifiable, and systems that cannot be verified should not be deployed. Making our system testable pushes us towards a design where classes are small and have a single purpose!
- Simple Design Rule #2: No duplication - you should never duplicate code, whether it's copy/pasted lines or duplicate implementation. "Reuse in the small" (minor duplication of lines) is essential to acheiving reuse in the large. Eliminating duplication improves the quality of your code and can expose breaking of the SRP.
- Simple Design Rule #3: Code should be express the intent of the programmer - the clearer the author can make the code, the less time others will have to spend understanding it. Use good names, keep functions and classes small, use standard nomenclature, use well-written unit tests.
- Simple Design Rule #4: Keep classes and methods to a minimum - lowest in the order of priority of simple design, but still important to remember - don't create classes/methods just for the sake of it (e.g. an insistence that every class has an interface).

**Chapter 13 – Concurrency**

- concurrency is hard - keep methods simple and small
- be rigorous with the SRP
- make sure you know your framework - make sure you use thread-safe classes
- lock where appropriate but keep locks as small as possible, as few as possible, and only one per class if possible
- test code that will run concurrently in production rigorously and under varying load and in different environments
- invest time in ensuring your system can shut down gracefully
- consider deadlocks, livelocks and thread starvation scenarios early..and implement strategies to handle these


	
