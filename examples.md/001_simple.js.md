	#!/usr/bin/env node
	'use strict';

Legion: A Simple Example
========================

Last updated: November 2017.

This example makes two GET requests to the Legion Obstacle Course test server.

The first request is made in plaintext HTTP. THe second request is made over
secure HTTPS.

The secure request will fail because the server will not be configured to
accept secure HTTPS traffic. I've intentionally included this failure for
illustrative purposes. It should be reported in the test results.

We start by including the obstacle course (Legion's self-test server),
as well as Legion itself.

	const obstacle = require('legion-obstacle-course');
	const L = require('legion');

The fetch library is based on node-fetch ((TODO: link)) and provides an
instrumented API vaguely similar to the WHATWG fetch API.

	const fetch = require('legion-io-fetch');

The delay library does what it says on the tin: it implements a delay in the
testcase. Testcases should include realistic delays -- in theoretical terms,
zero delay is infinite load.

	const delay = require('legion-io-delay');

Create a Legion load test using the Obstacle Course.

	L.create()
	  .using(obstacle)

We start the testcase with a small random delay.

	  .withTestcase(L.of()
	      .chain(delay(0,1))

Make the first request to the Obstacle Course. This will succeed.

	      .chain(fetch.text('http://localhost:' + obstacle.port + '/'))

A second small random delay passes between the two HTTP requests.
On average this should yield 0.5 seconds of delay per request, or
two requests per second.

	      .chain(delay(0,1))

Make the second request to the Obstacle Course. HTTPS is supported in Legion,
but not on the Obstacle Course server specifically, so this will fail.

	      .chain(fetch.text('https://localhost:' + obstacle.port + '/')))

Finally, we call Legion's default main method. We can run this with multiple
concurrent users by specifying the -n flag.

	  .main();
