	#!/usr/bin/env node
	'use strict';

Legion: Building SMTP Testcases in "Easy Mode" with Sections
============================================================

Last updated: December 2017

This example demonstrates how you can use Legion to load test an SMTP (email)
server. At the time of this writing, Legion doesn't include any special SMTP
support, but we can implement the testcase we need using vanilla JavaScript and
a popular SMTP client.

Setup
-----

First, we'll use
[smtp-connection](https://nodemailer.com/extras/smtp-connection/) to set up,
well, an SMTP connection. Although this example won't use the obstacle
course, we can rely on the obstacle course to provide an appropriate
port number.

Unfortunately, as of the time of this writing smtp-connection doesn't support
promises, so we use util.promisify to hide away the callbacks.

	const SMTPConnection = require('nodemailer/lib/smtp-connection');
	const port = require('legion-obstacle-course').tcp.echo.port;
	const util = require('util');

	async function setup() {
	  const connection = new SMTPConnection({
	    host: 'localhost',
	    port: port,
	    tls: { rejectUnauthorized: false }
	  });
	
	  await util.promisify(callback => connection.connect(callback))();
	
	  return connection;
	}

Sending Mail
------------

Second, we need a function to send the SMTP message.

	function send(connection, from, to, message) {
	  return util.promisify(callback => connection.send({ from, to }, message, callback))();
	}

Putting it all together
-----------------------

This is all it takes to test sending email:

	const L = require('legion');
	
	L.create()
	  .withBeforeTestAction(startTestServer)
	  .withAfterTestAction(stopTestServer)
	  .withTestcase(L.of().chain(async () => {
	    const connection = await setup();
	    await send(connection, 'alice@example.com', 'bob@example.com', 'hello, bob');
	    connection.quit();
	  }))
	
	  .main();

The Test Server
---------------

You'll notice the 'startTestServer' and 'stopTestServer' calls in the previous section. We need an actual SMTP server running on localhost on the port we've selected. For our purposes the convenient way to provide one is to launch it as part of this test script.

	function startTestServer(state) {
	  const SMTPServer = require('smtp-server').SMTPServer;
	  
	  const server = new SMTPServer({ authOptional: true }).listen(port);
	
	  return state.withService('custom-smtp-server', server);
	}
	
	function stopTestServer(state) {
	  state.getService('custom-smtp-server').close();
	}
Results
-------

((Screenshot showing number of successful events.))
