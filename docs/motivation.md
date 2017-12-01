What is Legion?
===============

Legion is a distributed, protocol-agnostic load testing tool.

Why does it exist?
==================

I wanted to create a tool that would solve the most challenging problems I've
encountered in my seven years of helping clients improve the performance,
capacity, and risk exposure of their network-enabled applications.

Those problems include:

(1) Complexity of the use case or test design,

(2) Unusual or proprietary protocols,

(3) Requirements to scale beyond one million concurrent users,

(4) Difficulty understanding or trusting the results of a test, and,

(5) Difficulties with training new people on a given tool.

My hope is that Legion will eventually address all five of these problem areas.

What are Legion's advantages?
=============================

Scalable
--------

Legion is designed from day one to be infinitely scalable. This means
that Legion:

 * Produces a finite amount of output even from a hypothetically
   infinite cluster of load-generating instances.

 * Collects output and distributes command-and-control actions
   using resources that are logarithmic in the number of
   load-generating instances.

Not every deployment of Legion automatically has these properties, but the
semantics of Legion's inter-process communication makes them possible.

Scriptable
----------

Legion is a Node.js library written in vanilla JavaScript. Part of the intent
of Legion is to leverage the wealth of publicly available JavaScript software
to test almost any kind of network-enabled service you can imagine.

JavaScript today is both expressive and easy to learn, with mature tooling, and
works smoothly as a functional, object-oriented, or just an everyday
get-it-done scripting language, depending on your need.

We can assume that most organizations that develop network-enabled services
employ at least a few developers with JavaScript experience.

If we made any other choice of platform we would not have this golden triad of
capabilities: broad library support, versatile software engineering, and
accessibility for end-users.

Adaptable
---------

Legion is designed as a family of loosely-coupled libraries and tools. Support
for building test scripts is separate from the metrics reporting format, which
is again separate from command-and-control, and so on.

If you want to build distributed scripts that report metrics in a different
format, you can. If you want to report metrics from another source, say for
example a C# .NET framework, you only need to speak Legion's JSON format. To
the greatest extent possible, every component can be replaced and every
component is optional.

Measure Everything
------------------

Legion has a "expose everything," "measure everything" philosophy. The purpose
of a test is to find problems. Users need confidence that the testing tool
itself is not the source of a problem. Problems must be plainly apparent, not
hidden away in the arcana of the tool's internals.

Future Plans
============

There are two major tasks remaining on Legion's long-term plan:

First, we need an excellent tool to capture and replay HTTP and HTTP2 test cases.
Legion obviously supports the HTTP protocol, but scripting is entirely by hand.
This is not competitive with other tools.

Second, although Legion already makes many problems much easier then they would
otherwise be, only software developers can use it. We need a compelling GUI
tool that will also make easy problems easy.
