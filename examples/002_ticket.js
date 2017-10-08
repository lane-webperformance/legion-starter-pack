#!/usr/bin/env node
'use strict';

/*
 * This example makes a series of calls to the 'ticket' app
 * on the legion-obstacle-course test server. The ticket app
 * is a trivial JSON API where we can request a ticket
 * with a random unique ID, and later "redeem" the same ticket
 * by submitting that ID.
 *
 * This example demonstrates the ability to extract a value from
 * a previous response and use it in a subsequent request.
 */

const obstacle = require('legion-obstacle-course');
const L = require('legion');
const rest = require('legion-io-fetch').rest;
const delay = require('legion-io-delay');

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

L.create()

  .using(obstacle)

  .withTestcase(L.of()
    .chain(delay(0,1))
    .chain(rest.post(obstacle.host + '/ticket/new'))
    .chain(assertSuccess)
    .chain(response => delay(0,1).chain(() => response))
    .chain(response => rest.post(obstacle.host + '/ticket/redeem?ticket=' + response.json.ticket))
    .chain(assertSuccess))

  .main();
