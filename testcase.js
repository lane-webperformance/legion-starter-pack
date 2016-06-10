/* eslint-disable no-console */

// Note: if you don't like the eslint warnings, just delete .eslintrc.json.

'use strict';

const L = require('legion');
const fetch = require('legion-io-fetch');

L.create()

  // If you need to, add any pre-test setup steps here.
  .before(() => undefined)

  // If you need to, add any post-test tear-down steps here.
  .after(() => undefined)

  // Define the testcase.
  .testcase(fetch.text('http://www.example.com')
    .chain(() => console.log('Edit this to load your web site.')))

  .main();
