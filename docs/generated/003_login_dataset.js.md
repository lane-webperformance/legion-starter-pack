	#!/usr/bin/env node
	'use strict';

Picking Unique Items from an Array
==================================

This example makes a series of calls to the login app
on the legion-obstacle-course test server.

The login app is a trivial JSON API where we can login
exactly once with any of a small set of credentials.
If attempt to login twice with the same credentials,
the login attempt will be rejected.

This example demonstrates the ability to choose unique
values from a small dataset. This example will work when
run with multiple users.

If you set up a control server using the legion-control
package, multiple instances connected to the same control
server will not re-use the same credential.

Because there are only 9 login credentials in the data set,
this testcase will fail if run with more then 9 users.

	const obstacle = require('legion-obstacle-course');
	const L = require('legion');
	const querystring = require('querystring');
	const rest = require('legion-io-fetch').rest;
	const delay = require('legion-io-delay');

First we set up a standard function to assert that a response was successful.

	function assertSuccess(response) {
	  if( !response.ok )
	    throw new Error('Response was not Ok.');
	
	  if( response.json.status !== 'success' )
	    throw new Error( response.json.status + ': ' + response.json.reason );
	
	  return response;
	}

This is our set of valid Login IDs, copied over from the Legion Obstacle
Course package. The Obstacle Course won't accept any other IDs, nor will
it accept the same ID twice.

	const LOGIN_IDS = ['hello1','ajmurray','joe@example.com','sue@example.com','testaccount1','testaccount2','testaccount3','testaccount4','testaccount5'];

Create a load test using the Obstacle Course.

	L.create()
	  .using(obstacle)

Start the testcase with a small delay.

	  .withTestcase(L.of()
	    .chain(delay(0,1))

Get the index for the next ID.

	    .chain(L.getCounters('login-ids', 1))

Lookup the ID in our LGOIN\_IDS table.

We use 'i.from' because we can request a range of IDs, which will arrive in a
'{ to, from }' pair. In this case we only request one ID at a time, which we can
just get by the 'from' field.

	    .chain(i => LOGIN_IDS[i.from])

Now make the RESTful HTTP request using the ID.

	    .chain(login_id => rest.post(obstacle.host + '/login?' + querystring.stringify({id: login_id})))

Validate that the request was successful.

	    .chain(assertSuccess))

	  .main();
