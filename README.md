
legion-starter-pack
-------------------

This is a "batteries included" npm package, shrinkwrapped with a stable build
of all of the Legion libraries and example testcases.

You can use this package to learn from the examples or as a starting point for
your own testcase development.

To Run the Examples . . .
-------------------------

	npm install
	node main.js ./examples/001_simple.js

Or run any of the other examples. We hope to have a large number of examples
numbered by complexity, so you can start small and work your way up.

To write your own testcase . . .
--------------------------------

. . . just edit testcase.js and run:

	npm start

-or-

	node testcase.js

This will run the testcase with only one concurrent user. To run with many
users (say, 50), try:

	npm start -- -n 50

-or-

	node testcase.js -n 50

If you need to write a testcase that's similar to one of the examples, consider
copying the example onto testcase.js and using it that way.
