#!/usr/bin/env node
'use strict';

const querystring = require('querystring');

/*
 * This example makes a series of calls to the 'login' app
 * on the legion-obstacle-course test server. The ticket app
 * is a trivial JSON API where we can login exactly once with
 * any of a small set of "credentials".
 *
 * This example demonstrates the ability to choose unique
 * values from a small dataset.
 *
 * Because there are only 9 login credentials in the data set,
 * this testcase will fail if run with more then 9 users.
 */

const obstacle = require('legion-obstacle-course');
const L = require('legion');
const rest = require('legion-io-fetch').rest;
const delay = require('legion-io-delay');

/*
 * Validate that a response was successful.
 */
function assertSuccess(response) {
  if( !response.ok )
    throw new Error('Response was not Ok.');

  if( response.json.status !== 'success' )
    throw new Error( response.json.status + ': ' + response.json.reason );

  return response;
}

/*
 * Set of valid Login IDs.
 */
const LOGIN_IDS = ['hello1','ajmurray','joe@example.com','sue@example.com','testaccount1','testaccount2','testaccount3','testaccount4','testaccount5'];

// Configuration for the test server.
const port = 8500;
const host = 'http://localhost:' + port;
let server = null;

L.create()

  .withBeforeTestAction(() => {
    server = obstacle.listen(port);
  })

  .withAfterTestAction(() => {
    server.close();
    server = null;
  })

  .withTestcase(L.of()
    .chain(delay(1,2))
    .chain(L.getCounters('login-ids', 1))
    .chain(i => LOGIN_IDS[i.from])
    .chain(login_id => rest.post(host + '/login?' + querystring.stringify({id: login_id})))
    .chain(assertSuccess))
  .main();
