Case Study: Load Testing a Raw TCP Service
==========================================

Last updated: November 2017

A customer approached us wanting to load test a network service via a
proprietary binary TCP protocol. The customers use case involved thousands of
simultaneous connections from mobile IoT (Internet of Things) devices.

We decided that this was a perfect opportunity to use Legion.

Requirements
------------

The protocol called for sequential request/response communication with no
pipelining or interleaving of messages. There were multiple request and
response types which had varying sizes and some fields of every request needed
to be unique or dynamic. There seemed to be at least some server-side state
being maintained for each connection and requests needed to be consistent with
that state. The customer expected us to measure the time needed to receive a
response, to measure bandwidth utilization, and to report statistics for every
individual event.

Challenges
----------

At the time, Legion was still relatively new. We needed ad-hoc solutions for
certain problems that are now handled within the standard logic of the
framework. For example, tracking every individual event has never been one of
Legion's core design goals, and Legion at the time had no health
self-assessments (it does now).

The primary challenge for this project, in our minds, was always the fact that
it involved a proprietary binary protocol. By definition, it was not possible
for us to have any experience with the customer's protocol before the customer
approached us. This necessarily introduced a certain amount of uncertainty into
the project schedule, as we had to assume there would be stumbling blocks which
we could not possibly anticipate or plan for. As it happened, there were
certain decisions we made early in the project that gave us extra adaptability
when issues did crop up.

Implementation
--------------

We started by learning the binary protocol and implementing it on top of (TODO
LINK:) node-struct, a JavaScript library that converts between C-style binary
structs and plain JavaScript objects. This allowed us to peek and poke the
example messages that the customer provided. We used this capability to inject
dynamic values, verify response codes, and generally observe that messages were
sensible.

Working with node-struct represented a modest extra effort in the opening stage
of the project. It would have been possible to directly manipulate dynamic
values in their raw binary form. In practice, node-struct paid considerable
dividends over time. The ability to quickly and reliably convert the binary
data to a human-readable format meant that we were able to quickly and
thoroughly understand bugs or mistakes in the binary messages, and also gave
us an enormous flexibility to iterate and adapt to rapidly meet customer needs.

With the ability to generate and edit messages, it was then necessary to build
a rudimentary promise-based client API on top of Node's TCP implementation. With the
this API in hand the remaining work would be trivial, as Legion in it's simplest
mode of operation simply measures the time needed to fulfill a promise.  This
work was straightforward but detail-oriented, and will be covered in a separate
article. ((TODO: LINK TO ARTICLE))

Finally, we implemented the test case logic. Each virtual user connected to the
server, sent an initial connection request, and then sent a continuous series
of requests selected from a pool of random possibilities. The test case itself
was only about one page of code. We were able to modify the test case
on-the-fly to answer specific questions posed by the customer.

The total time to complete the project was about 2 weeks. At that time we delivered
all relevant assets to the customer for their ongoing use.

Lessons Learned
===============

Following up on our experience with this project, we added a number of new
capabilities. It's now much easier to deploy large numbers of load generating
instances, and it's now possible to control these instances remotely at run
time. We made it easier to report custom metrics. We're also in the process of
improving our ability to visualize and interpret the data that Legion produces.

