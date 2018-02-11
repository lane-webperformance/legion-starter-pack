#!/usr/bin/env node
'use strict';
const obstacle = require('legion-obstacle-course').http;
const L = require('legion');
const querystring = require('querystring');
const rest = require('legion-io-fetch').rest;
const delay = require('legion-io-delay');
function assertSuccess(response) {
  if( !response.ok )
    throw new Error('Response was not Ok.');

  if( response.json.status !== 'success' )
    throw new Error( response.json.status + ': ' + response.json.reason );

  return response;
}
const LOGIN_IDS = ['hello1','ajmurray','joe@example.com','sue@example.com','testaccount1','testaccount2','testaccount3','testaccount4','testaccount5'];
L.create()
  .using(obstacle)
  .withTestcase(L.of()
    .chain(delay(0,1))
    .chain(L.getCounters('login-ids', 1))
    .chain(i => LOGIN_IDS[i.from])
    .chain(login_id => rest.post(obstacle.host + '/login?' + querystring.stringify({id: login_id})))
    .chain(assertSuccess))

  .main();
