	#!/usr/bin/env node
	'use strict';

Legion: Using values from previous requests
===========================================

Last updates: November 2017

This example makes a series of calls to the 'ticket' app
on the Legion Obstacle Course test server. The ticket app
is a trivial JSON API where we can request a ticket
with a random unique ID, and later "redeem" the same ticket
by submitting that ID.

This example demonstrates the ability to extract a value from
a previous response and then submit it in a later request.

	const obstacle = require('legion-obstacle-course');
	const L = require('legion');
	const rest = require('legion-io-fetch').rest;
	const delay = require('legion-io-delay');

Validate that a response was successful. Without this call,
the testcase will report only very low level failures (such as
being unable to connect). By checking response.ok, we can be
sure that we got a 2xx status code. Then we also check the status
code carried in the JSON payload.

	function assertSuccess(response) {
	  if( !response.ok )
	    throw new Error('Response was not Ok.');
	
	  if( response.json.status !== 'success' )
	    throw new Error( response.json.status + ': ' + response.json.reason );
	
	  return response;
	}

Create a load test using the Obstacle Course.

	L.create()
	  .using(obstacle)

Start the testcase with a short delay.

	  .withTestcase(L.of()
	    .chain(delay(0,1))

Make an HTTP request for a new ticket. The result will be a JSON object
with a status: "success" and a unique ticket field.

	    .chain(rest.post(obstacle.host + '/ticket/new'))

Validate the status codes in the response.

	    .chain(assertSuccess)

Another short delay while remembering the response.

	    .chain(response => delay(0,1).chain(() => response))

After the delay is over, redeem the same ticket we requested earlier.

	    .chain(response => rest.post(obstacle.host + '/ticket/redeem?ticket=' + response.json.ticket))

Again, validate the response.

	    .chain(assertSuccess))

Make the load test available from the command line by using Legion's default
main() method.

	  .main();
