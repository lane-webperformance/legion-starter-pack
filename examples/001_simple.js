'use strict';

/*
 * This testcase makes a HTTP GET request to the Legion Obstacle Course
 * test server, followed by second HTTPS request.
 * 
 * The HTTPS request will fail because this server is not configured to
 * accept HTTPS traffic. I've intentionally included this failure for
 * illustrative purposes. It will be reported in the test results.
 */

const obstacle = require('legion-obstacle-course');
const L = require('legion');
const fetch = require('legion-io-fetch');

const port = 8500;
const host = 'http://localhost:' + port;
const secure_host = 'https://localhost:' + port;
let server = null;

L.create()

  // Set up the obstacle course server before the test.
  .before(() => {
    server = obstacle.listen(port);
  })

  // Take down the server after the test.
  .after(() => {
    server.close();
    server = null;
  })

  // The testcase itself.
  .testcase(L.of()
      .chain(fetch.text(host))           //this will succeed
      .chain(fetch.text(secure_host)));  //this will fail

// Run the testcase according to the command line arguments.     
  .main();
