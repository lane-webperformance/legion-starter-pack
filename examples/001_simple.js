#!/usr/bin/env node
'use strict';

/*
 * This example makes a HTTP GET request to the Legion Obstacle Course
 * test server, followed by an HTTPS (secure) request.
 * 
 * The secure request will fail because the server will not be configured to
 * accept secure HTTPS traffic. I've intentionally included this failure for
 * illustrative purposes. It will be reported in the test results.
 *
 * This example demonstrates the basic ability to make requests to a server,
 * collect statistics about server performance, and recognize failures.
 */

const obstacle = require('legion-obstacle-course');
const L = require('legion');
const fetch = require('legion-io-fetch');
const delay = require('legion-io-delay');

const port = 8500;
const host = 'http://localhost:' + port;
const secure_host = 'https://localhost:' + port;
let server = null;

L.create()

  // Set up the obstacle course server before the test.
  .withBeforeTestAction(() => {
    server = obstacle.listen(port);
  })

  // Take down the server after the test.
  .withAfterTestAction(() => {
    server.close();
    server = null;
  })

  // The testcase itself.
  .withTestcase(L.of()
      .chain(delay(0,1))
      .chain(fetch.text(host))           //this will succeed
      .chain(delay(0,1))
      .chain(fetch.text(secure_host)))   //this will fail

  // Run the testcase according to the command line arguments.     
  .main();
