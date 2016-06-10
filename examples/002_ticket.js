'use strict';

/*
 * This testcase makes a series of calls to the 'ticket' app
 * on the legion-obstacle-course test server. The ticket app
 * is a trivial JSON API where we can request a ticket
 * with a random unique ID, and later "redeem" the same ticket
 * by submitting that ID.
 */

const obstacle = require('legion-obstacle-course');
const L = require('legion');
const rest = require('legion-io-fetch').rest;

/*
 * Validate that a response was successful. Without this call,
 * the testcase will report only very low level failures (such as
 * being unable to connect to the HTTP port). By checking
 * response.ok, we can be sure that we got a 2xx status code.
 * Then we also check the status code carried in the JSON
 * payload.
 */
function assertSuccess(response) {
  if( !response.ok )
    throw new Error('Response was not Ok.');

  if( response.json.status !== 'success' )
    throw new Error( response.json.status + ': ' + response.json.reason );

  return response;
}

// Configuration for the test server.
const port = 8500;
const host = 'http://localhost:' + port;
let server = null;

L.create()

  .before(() => {
    server = obstacle.listen(port);
  })

  .after(() => {
    server.close();
    server = null;
  })

  .testcase(L.of()
    .chain(rest.post(host + '/ticket/new'))
    .chain(assertSuccess)
    .chain(response => rest.post(host + '/ticket/redeem?ticket='+ response.json.ticket))
    .chain(assertSuccess));

  .main();
