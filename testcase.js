/* eslint-disable no-console */

'use strict';

require('./uptime');

const fetch = require('legion-io-fetch');
const L = require('legion');

L.create()

  // If you need to, add any pre-test setup steps here.
  .before(() => undefined)

  // If you need to, add any post-test tear-down steps here.
  .after(() => undefined)

  // Define the testcase.
  .testcase(fetch.text('http://www.example.com')
    .chain(() => console.log('Edit this to load your web site.')))

  .main();
