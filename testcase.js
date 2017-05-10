#!/usr/bin/env node

/* eslint-disable no-console */
'use strict';

const fetch = require('legion-io-fetch');
const delay = require('legion-io-delay');
const L = require('legion');

L.create()

  // Define the testcase.
  .withTestcase(L.of()
    .chain(delay(0,1))
    .chain(fetch.text('http://www.example.com')))

  .main();
