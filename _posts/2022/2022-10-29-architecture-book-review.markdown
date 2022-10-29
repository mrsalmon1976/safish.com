---
layout: post
title: Book review - Software Architecture The Hard Parts Modern Trade-Off Analyses for Distributed Architectures
date: 2022-10-29 13:40:00
tags: [bookreview]
published: true
---

This is my personal summary of the book [Software Architecture: The Hard Parts: Modern Trade-Off Analyses for Distributed Architectures(https://www.amazon.com/Software-Architecture-Trade-Off-Distributed-Architectures/dp/1492086894)].  It's important to note that this is only written to jog my memory - it is almost impossible to capture this book as a summary as there is so much in it.  I highly recommend buying this book for any software architect working in complex, large systems.  It's not an easy read, but it covers many of the problems and trade-offs moving from a monolith to a microservice or service based architecture.

# Chapter 1 - What Happens When There Are No “Best Practices”?

## Architectural Decision Records (ADR)

A short noun phrase containing the architecture decision made up of
* Context - short one- or two-sentence description of the problem, and possible solutions.
* Decision - state the architecture decision with detailed justification of the decision
* Consequences - any consequences after the decision is applied, and trade-offs considered

## Architecture Fitness Functions

* Any mechanism that performs an objective integrity assessment of some architecture characteristic or combination of architecture characteristics
* Automation and feedback are central to teams that want to move quickly without fear of breaking things 
* Fitness functions validate architecture characteristics, as opposed to unit tests which validate domain criteria. An architect can decide whether a fitness function or unit test is needed by asking the question: “Is any domain knowledge required to execute this test?” If the answer is “yes,” then a unit/function/user acceptance test is appropriate; if “no,” then a fitness function is needed.
* Example: tests to ensure cyclic complexity rules are not breached; DI container can be verified; naming conventions are adhered to
* Build these into your build pipeline - nice opportunity for architects to be involved in the code
* Be careful to not take this too far - don’t want to overburden developers with too many hoops and slow the team down unnecessarily 
	
# Chapter 2 - Discerning Coupling in Software Architecture 

* Coupling - Two parts of a software system are coupled if a change in one might cause a change in the other
* Choosing to decouple components adds complexity and taken too far, can over complicate your system and render it unworkable. Architects need to weigh up the trade-offs of decoupling and apply these given the pros and cons
* Advice for modern trade-off analysis in software architecture
  * Find what parts are entangled together.
  * Analyze how they are coupled to one another.
  * Assess trade-offs by determining the impact of change on interdependent systems.
* Static vs dynamic coupling - static coupling describes how services are wired together (operation dependencies e.g. database), whereas dynamic coupling describes how services call one another at runtime (communication dependencies e.g. calling another service)
* The architectural quantum (number of shared dependencies) has a major impact on scalability and elasticity of your systems. It's all very well having loosely coupled systems that operate independently, but if they all rely on a single database and the database locks up, all services are affected

# Chapter 3 - Architectural Modularity

Describes why you should break up a monolithic application.

Architecture should not be over-engineered - there is a tradeoff to complex distributed systems in both skills required, and processes/infrastructure required to handle them. Architects shouldn’t break a system into smaller parts unless clear business drivers exist. Business drivers for breaking applications into smaller parts are for competitive advantage and agility (speed to market).  As applications grow in size, the modularity drivers present a strong case for splitting an application into smaller, independently deployable parts e.g. microservice architecture.

Competitive advantage requires availability and scalability, agility requires testability, deployability and maintainability.

Modularity Drivers:

* Maintainability - monolithic applications are harder to maintain as changes affect all levels of the application, which may require input from multiple teams.  Microservices architecture requires specific services to change.
* Testability - more difficult in monolithic architecture and results in longer build times as all tests need to run with every change. Microservices means smaller testable units and fewer tests that need to run when changes are made. 
* Deployability - microservices allows for the deployment of a single piece of the application only. Deployments are lower risk as only one component is changing, not the whole application.
* Scalability is easier to achieve with microservices as effort can be put into the areas that are under load, rather than changes and deployments to the whole app.
* Availability - a single component crashing can leave the rest of the application still available.
	
All of these benefits of a microservices architecture diminish as communication between the services increases, which in turn raises a strong case for asynchronous communication which decreases runtime dependencies.

# Chapter 4 - Architectural Decomposition 

Describes how you should break up a monolithic application.

## Component based decomposition
* Break the application up into multiple components
* When breaking monolithic applications into distributed architectures, build services from components, not individual classes.
* Usually easiest to move to a service based architecture first as a stepping stone to a microservices architecture - this allows you to keep the existing database and focus on the domain and functional partitioning prior to tackling database decomposition

## Tactical forking
* Useful when the application is a big ball of mud and doesn’t have many obvious components 
* Clone a full copy of the application, and for example, deploy to different areas of the business, in each version deleting what is no longer used
* Teams can start on this immediately with very little risk or analysis
* Still requires concerted effort as the code is in no better state

# Chapter 5 - Component-Based Decomposition Patterns

Steps moving from monolithic to microservices application:

1. Identify and size components
   * identify and catalog the architectural components (logical building blocks) of the application and then properly size the components (e.g. number of statements). Components should be of a similar size relative to others and this can be reflected using statement count, file count, and percentage of total statements across the code base. If a component is too big, try and find sub domains to split it into smaller components - but don’t contrive these for the sake of it.
2. Gather common domain components 
	* Consolidating common domain functionality helps eliminate duplicate services when breaking apart a monolithic system. Often there are only very subtle differences among common domain functionality that is duplicated throughout the application, and these differences can be easily resolved within a single common service (or shared library).
	* For example, common use of SMTPConnection hints at copied logic to send email, and would benefit from a common service
3. Flatten components 
	* Don’t have source code at different namespace levels as you start to lose sight of what the components are. Rather move all code into leaf nodes of the same level so components are easily identifiable e.g. *myapp.reporting.mis*, *myapp.reporting.financial*, *myapp.reporting.shared*. Don’t put shared code into a root namespace as it becomes unclear what those classes are for.
4. Determine component dependencies 
	* Build a dependency diagram of the monolith to determine coupling between components. Minimal dependencies means the monolith is a good candidate for refactoring into separate services with minimal effort. High levels of dependencies may make refactoring too difficult and a rewrite should be considered instead.
5. Create component domains
	* Logically group components together - multiple components may fall into a single service e.g a billing service may have both a payment component and a history component.
6. Create domain services
	* Individually deployable pieces of software that encapsulate a specific domain function. Generally each of these will be coupled with a monolithic database, but this serves as a great starting point for seeing whether services can be broken down further 
7. Create microservices

# Chapter 6 - Pulling Apart Operational Data

## When to consider breaking apart your data
* Change control - when you have a large number of services, co-ordinating database scheme changes become onerous, especially if services are managed by different teams.
* Connection management- each service will generally have its own connection pool, which will eventually result in too many connections to a shared database.
* Scalability - more databases results in fewer connection waits as services grow, and spreads I/O load on a single database.
* Fault tolerance - remove single points of failure.
* Architectural quantum - splitting the databases increases the quanta count, allowing for the easier deployment of separate services as dependencies are removed.
* Database type optimization- use the right tool for the job.

## When to consider keeping data together?
* Data integrity - foreign keys, triggers, etc
* Transactions - using different databases can mean losing the concept of a single unit of work

Trade-offs! You need to decide what is more important, and then protect against the lost benefit.

## Decomposing Monolithic Data
1. Analyze data and create data domains
2. Assign tables to data domains
3. Separate database connections to different domains - when data is needed from other domains it should be accessed via services rather than accessing those databases directly
4. Move schemas to separate databases or database servers - this can be done using backup/restore or with replication. Merge replication would be the safest and easiest method, but does require the most setup
5. Switch over to independent servers/databases

# Chapter 7 - Service Granularity 

## Granularity Disintegrators - reasons to break apart a service
* Service scope and function - single responsibility principle, although this is highly subjective e.g. is notifying a customer a single responsibility or is notifying a customer via Email specifically a single responsibility?
* Code volatility - rate at which code changes. Areas which change frequently justify being move out into another service - less testing and deployment impact on the areas that do not change frequently. 
* Scalability and throughput - high variances in scalability and throughputs may justify splitting up a service.
* Fault tolerance - differing levels of fault tolerance means components that crash regularly may bring other components out of action. Also may want to employ more fault tolerance measures for critical services.
* Security - certain components may need to be more secure than others.
* Extensibility - the ability add functionality as requirements grow e.g. payment support types, it may be worthwhile separating these into different services from the outset so that as you add payment types you don’t need to retest and deploy all other payment types.

## Granularity Integrators - reasons to keep components in a single service
* Database Transactions - a requirement for ACID transactions is a good argument for not separating components into different services.
* Workflow and Choreography - increasing the number of services increases the amount of communication required between these services...and a central key service going down may impact all other services. It is important to consider the communication dependencies with respect to your overall fault tolerance.
* Shared code - sometimes a high level of common code means it may make more sense to keep components in the same service.
* Data relationships - splitting components that own/access the same data may negatively impact complexity, performance, fault tolerance and scalability.

The choice to integrate or disintegrate must be driven by solid analysis, and the trade offs weighed up in the light of the business need.

# Chapter 8 - Code Reuse

Reuse of code in monolithic applications is common and encouraged, whereas sharing code in microservices creates dependencies and hence coupling, so reuse is generally discouraged.  Patterns for reuse:

## Code replication
* literally copy and paste
* Rarely used, but is useful for static code that has a low chance of bugs and will rarely change 

## Shared Library
* Common class or jar file
* Dependency management easy but making changes means updating every app/service that uses it
* Versioning is essential - allows you to only upgrade the apps that require the new version
* Performance, scalability not affected as compiled in
* Best suited to low change areas of code

## Shared Service
* Common service which separately deployed
* Easier deployment as only one instance
* Riskier deployment as only one instance which is used by everything
* Introduces network latency to service calls…impact on performance and scalability 
* Versioned APIs can reduce deployment risk but introduce the requirement for deployment of each dependent application 
* May need to scale with other services as it is not deployed as a component of them
* Fault tolerance is an issue as you introduce another working point of failure - this can be mitigated with multiple instances but that introduces complexity 
* Best use in environments with multiple languages and technologies and when shared functionality changes often

## Sidecar Pattern
* Allows a clean way to spread some sort of cross-cutting concerns across a distributed architecture
* Implement sidecars in a service mesh that allows you to share common operational concerns (not domain concerns)
* Usually used for common operational requirements eg. Logging or monitoring 
* Allows for consistent implementation and infrastructure coordination 
* Sidecars can become large and complex
* It is very important that the service mesh is only used for operational concerns otherwise you introduce coupling problems before the introduction of microservices! Shared infrastructure items only!
	
## Code Reuse
* As developers we have been taught to encourage reuse of code
* However, this is not optimal in fast changing areas of code - changes in shared code require regression in every place that uses it, and changes become difficult to manage
* Shared code works very well in areas of slow change e.g. an operating system or infrastructure points - it does not necessarily work well on large systems where change occurs frequently e.g. domain code

# Chapter 9 - Data Ownership and Distributed Transactions

* Usually the service that writes to a table, owns the table...but this gets complex when multiple services need to write to the same table

## Possible scenarios 
* Single ownership scenario - only one service writes to a table 
*  Common ownership scenario- most or all tables write to a common table e.g. audit table - often solved by adding a new service to deal with the common area
* Joint ownership scenario- more than one service write to a single table. Can be solved by:
  * Splitting the table
  * Consolidating services 
  * Shared data domain e.g. move tables into single scheme and these are shared by services in that domain - not always encouraged but can be necessary to preserve data integrity, fault tolerance, performance, etc. Does result in coupling and higher regression needed for changes to this area of the system
  * Delegation - make only one service the owner of the table and all other services communicate with that service for updates. Does result in service coupling and difficulty with transactions 

## Distributed transactions
  
* Transactions are usually ACID and will roll back all changes on failure anywhere in the chain of modifications 
* Distributed transactions do not support ACID - instead they support BASE
  * BA - Basic Availability- all services must be available for the transactions
  * S- Soft state - describes the situation where a transaction is in progress - you can not determine which service has completed or how far along it is in doing its individual work
  * E - eventual consistency 
  
## Eventual Consistency Patterns

* Background Synchronisation Pattern
  * Background task that runs periodically to keep data in sync
  * Slowest in terms of eventual consistency
  * Good for overall responsiveness as user doesn't need to wait for entire business transaction to complete
  * Tightly coupled to the tables owned by the services, so must be changed and tested with the services
  * May require duplicated business logic in both the services and the background sync job
* Orchestrated Request-Based Pattern
  * Attempts to process the entire distributed patterns during the business request
  * Could be  separate service, or designate one of the exiting services to be the primary service in the transaction and co-ordinate all the necessary steps
  * Lends itself to tight coupling and dependencies
  * Can overload one of the services with responsibilities that aren't really the function of the affected service
  * Not the best for performance - as the orchestrator needs to co-ordinate in real-time across the services - can add network hops and latency
  * Error handling becomes complex - what if one of the services fails but the others have completed?
* Event-Based Pattern
  * Events used in conjunction with asynchronous publish/subscribe model
  * Services highly decoupled
  * Good performance
  * Error handling remains an issue - what if one of the subscribers fails to process the message?

# Chapter 10 - Distributed Data Access

In a monolithic applications, data can be accessed from anywhere in the system using SQL as there is a shared database.  However, accessing data that an application/service no longer owns is hard, as you introduce network calls and complexity trying to retrieve data that is no longer part of the service needing the data.

## Interservice Communication Pattern
* Simplest solution - use remote access protocol to request data from other services
* Slow performance due to network latency
* Increased activity as you can't "JOIN" for data
* Service coupling - you need another service to be alive for your service to function

## Column Schema Replication Pattern
* Replicate data between databases or schemas
* Usually implemented asynchronously to improve performance, so there may be inconsistency
* Need to be careful about what is done with replicated data - other services should not be able to update replicated data
* Good performance boost as services can do JOINs to get associated data
* No service dependency or fault tolerance issues
* Can be managed to pub/sub event streaming, but this does add a lot of complexity

## Replicated Caching Pattern
* Replicated in-memory caching so each service has the data it needs
* Each service has its own cached data (replicated), or a central distributed cache can be used - although the latter does introduce dependency and fault tolerance issues, as well as network latency
* Replicated caches are great for individual service performance, fault tolerance scalability
* Complex from an infrastructure perspective and each service has a dependency on its own cache
* Data volumes may be an issue - there is only so much that can be cached in memory, particularly if you have a lot of services
* High rate of change makes it difficult to keep the replicas in sync

## Data Domain Pattern
* Data in a shared schema, that more than one service has access to
* Services remain decoupled from each other - only the shared tables create a dependency
* Data consistency and integrity remains high
* Multiple services will need to change if the structure of this data changes
* Security is compromised as multiple services have access to the same data

# Chapter 11 - Managing Distributed Workflows

## Orchestration Communication Style
* Synchronizes disparate services
* In microservices architecture, there is usually one orchestrator per workflow (not one global orchestrator for all workflows)
* Pros
  * One area where state and behavior is managed
  * Error handling handled centrally
  * Can add retry capability at the orchestrator level
* Cons
  * Communication all through single mediator which can create a bottleneck
  * Single point of failure
  * Doesn't scale well as it needs to monitor multiple co-ordination points

## Choreography Communication Style
* Each service executes steps in the "dance" in predefined order
* Simpler to understand for the "happy" path, but gets complicated when errors occur
* One problem is no obvious owner for workflow state.  
* Pros:
  * Responsive and scalability - less co-ordination required
  * Fault tolerance easier to handle
  * Less service coupling
* Cons:
  * Error management difficult
  * State management difficult
  * Error handling more complex as each service must have more workflow knowledge
  * Recoverability more difficult as no central service to do retries and co-ordinate state

**Summary:** Choreography better for high throughput scenarios with simpler error handling requirements.  Orchestration best suited for complex workflows that include boundary and error conditions.

# Chapter 12 - Saga Patterns

Saga patterns describe the movement of data between services, where a sequence of local transactions each publish an event, which triggers the next update in the sequence.  The saga issues compensating updates if anything fails along the way.  Various types of pattern exist, but each need to choose between:
 * Synchronous vs asynchronous communication
 * Atomic vs eventual consistency
 * Orchestrated vs choreographed co-ordination

Any combination of these is valid in specific circumstances, but all come with their trade-offs.
	
# Chapter 13 - Contracts

* Strict vs loose contracts - each have their trade-offs; strict means higher data integrity, easier versioning, and easier verification at build time; loose contracts mean loose coupling and fewer problems with backward compatibility
* Contracts between services should be on a "need to know" basis - don't add properties in case you may need them in the future - you are just adding needless fragility
* Be wary of stamp coupling - where a large document is passed between services and each service only reads/writes a small portion of the document.  This can introduce unnecessary dependencies and each service has to handle data (over the network or from the DB) that it does not require - this can add up in high volume systems

# Chapter 14 - Data Analytics

## Legacy approaches

### Data Warehouse pattern
* Data extracted from many sources and transformed into a single schema
 * Aggregation and analysis done on the warehouse, removing the load from the transactional system
* BI Reports and dashboards
* Usually with a SQL Interface
* Downsides:
  * Very brittle - dependent on the source schema
  * Domain knowledge - architects, developers, DBAs and data scientiests must all co-ordinate changes and understand the evolution of those changes
  * Adds complexity to the system
  * Often don't produce value relative to the amount of work used to build/maintain
  * Bottlenecks occur trying to pull data from various sources
  * Operational and analytical data are often not the same

### Data Lake pattern
* Inverse of the data warehouse pattern
* Meant to be loose structure - a variety of data sources can be held in the lake
* Data extracted from many sources
* Still takes a centralized view of data
* Downsides:
  * Difficulties in discovery of data and relationships
  * Challenges with regards to personal information
  * Requires ad hoc transformation

## An alternative (modern) approach 

### Data Mesh pattern
* Each service has its own data product quantum (DPQ)
* The DPQ is responsible for modelling and transforming the data for the service - either synchronously or asynchronously
* An analytics quantum can then co-ordinate reporting across multiple DPQs
* Advantages:
  * Well suited to microservices
  * Follows modern architecture principles and engineering practices
  * Decouples operational and analytical data
  * Allows loosely coupled evolution of analytical capabilities
* Disadvantages
  * Requires contract coordination with DPQ
  * Requires asynchronous communication and eventual consistency
  * Complex
			
# Chapter 15 - Build Your Own Trade-Off Analysis

* Create coupling diagrams when breaking apart monolithic applications
* Analyse coupling points and build a matrix of possibilities
* Assess trade-offs of the posssibility matrix to help choose the correct path
* Ensure you are comparing apples with apples
* Ensure you have context - other factors may influence your decision e.g. regulations, budget constraints, etc
* Model relevant domain cases in multiple ways and looks at the trade-offs to each
* Try not to be swayed by products or evangelism - objectively choose the best approach regardless of "latest and greatest" claims - everything has trade-offs, make sure these are considered!
    

