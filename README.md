
![Legion Logo (Red)](./docs/logo-red.png "Legion Framework")

[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/legion-starter-pack/Lobby#)

legion-starter-pack
===================

Start with this [overview of the Legion load testing
framework](http://lane-webperformance.github.io/legion-starter-pack/).

What is this package?
---------------------

This is a "batteries included" npm package based on the latest stable
versions of the Legion libraries and example test cases.

You can use this package to learn from the examples or as a starting point for
your own test case development.

If you want to call Legion programmatically (i.e. not using the default main
method), or if you're just curious, you might want to look at the
[Legion Framework API](https://github.com/lane-webperformance/legion).

To Run the Examples . . .
-------------------------

	npm install
	node ./examples.js/001_simple.js

Or run any of the other examples. We hope to have a large number of examples
numbered by complexity, so you can start small and work your way up.

Some of the examples may have additional requirements. For example, the
Selenium WebDriver example won't work unless you have a working environment
for Selenium WebDriver.

To write your own test case . . .
--------------------------------

. . . just edit `testcase.js` and run:

	node testcase.js

This will run the test case with only one concurrent user. To run with many
users (say, 50), try:

	node testcase.js -n 50

If you need to write a test case that's similar to one of the examples, consider
copying the example onto test case.js and using it that way.
