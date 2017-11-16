#!/usr/bin/env node
'use strict';
const obstacle = require('legion-obstacle-course');
const L = require('legion');
const fetch = require('legion-io-fetch');
const delay = require('legion-io-delay');
L.create()
  .using(obstacle)
  .withTestcase(L.of()
      .chain(delay(0,1))
      .chain(fetch.text('http://localhost:' + obstacle.port + '/'))
      .chain(delay(0,1))
      .chain(fetch.text('https://localhost:' + obstacle.port + '/')))
  .main();
