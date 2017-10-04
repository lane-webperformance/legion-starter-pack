#!/usr/bin/env node

'use strict';

const L = require('legion');
const delay = require('legion-io-delay');
const webdriver = require('legion-selenium-webdriver');
const By = webdriver.By;
const Driver = webdriver.Driver;

const obstacle = require('legion-obstacle-course');
const port = 8500;
const host = 'http://localhost:' + port;
let server = null;

L.create()

  // Set up the obstacle course server before the test.
  .withBeforeTestAction(() => {
    server = obstacle.listen(port);
  })

  // Take down the server after the test.
  .withAfterTestAction(() => {
    server.close();
    server = null;
  })

  .using(webdriver.init(new webdriver.Builder().forBrowser('firefox')))
  .withTestcase(L.of()
    .chain(delay(5,10))
    .chain(Driver.get(host + '/static'))
    .chain(delay(5,10))
    .chain(Driver.findElement(By.linkText('Meep')).click())
    .chain(delay(5,10))
    .chain(Driver.findElement(By.id('left')).click())
    .chain(Driver.findElement(By.id('left')).getText())
    .chain(text => assertEquals('meep!'))
    .chain(Driver.findElement(By.id('right')).getText())
    .chain(text => assertEquals('Right'))
    .chain(delay(5,10)))
  .main();

function assertEquals(x) {
  return s => {
    if( x !== s )
      throw new Error('expected ' + x + ' but found ' + s);
  };
}
