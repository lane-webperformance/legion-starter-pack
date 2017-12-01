#!/usr/bin/env node
'use strict';
const obstacle = require('legion-obstacle-course');
const L = require('legion');
const fetch = require('node-fetch');
L.create()
  .using(obstacle)
  .withTestcase(L.of()
    .chain(L.named.section('quick-request', async function() {
      const response = await fetch(obstacle.host + '/delay?response=500&content=500');

      if( !response.ok )
        throw new Error('Unexpected error.');

      await response.text();
    }))
    .chain(L.named.section('slow-request', async function() {
      const response = await fetch(obstacle.host + '/delay?response=5000&content=5000');

      if( !response.ok )
        throw new Error('Unexpected error during slow request.');

      await response.text();
    })))

  .main();
