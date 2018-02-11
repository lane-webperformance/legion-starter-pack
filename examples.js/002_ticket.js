#!/usr/bin/env node
'use strict';
const obstacle = require('legion-obstacle-course').http;
const L = require('legion');
const rest = require('legion-io-fetch').rest;
const delay = require('legion-io-delay');
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
