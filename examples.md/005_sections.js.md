	#!/usr/bin/env node
	'use strict';

Legion: "Easy Mode" with Named Sections and Async Await
=======================================================

Last updated: November 2017

This example demonstrates how you can use named sections measure performance of a plain old async-await programs. You might be interested in this example if you:

 * There is no instrumentation support for your API in Legion
 * Your API is particularly awkward to instrument.
 * You have a pre-existing async-await style program that you don't want to convert to work with Legion
 * Your API is instrumented, but you want to measure the combined performance of a sequence of related calls.
 * You want to assure that there is no unaccounted time in your testcase (the sum of the parts should equal the whole).

Legion supports a concept called "named sections". A named section is just that, a contiguous part of a larger testcase that has a unique name. Legion measures the number of times a section is run and the total time needed to run it.

A named section is also a quick way to instrument something if you don't want to bother learning Legion's instrumentation API. Accordingly, in this example we'll be able to do most of our work in plain vanilla javascript.

Setup
-----

As with other examples, we'll start by loading up the obstacle course. But this time we'll import the original node-fetch implementation of the WHATWG fetch API.

	const obstacle = require('legion-obstacle-course').http;
	const L = require('legion');
	const fetch = require('node-fetch');

As with most examples, we'll create a Legion load test using the Obstacle Course. This time we'll use the delay API. The delay API simply responds after a delay that we can specify.

	L.create()
	  .using(obstacle)
	  .withTestcase(L.of()

The "quick" request should take 1 second to complete.

	    .chain(L.named.section('quick-request', async function() {
	      const response = await fetch(obstacle.host + '/delay?response=500&content=500');
	
	      if( !response.ok )
	        throw new Error('Unexpected error.');
	
	      await response.text();
	    }))

White the "slow" request should take 10 seconds to complete.

Both requests will appear in the final statistics under their given section names.

	    .chain(L.named.section('slow-request', async function() {
	      const response = await fetch(obstacle.host + '/delay?response=5000&content=5000');
	
	      if( !response.ok )
	        throw new Error('Unexpected error during slow request.');
	
	      await response.text();
	    })))

	  .main();
