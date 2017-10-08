#!/usr/bin/env node

'use strict';

const L = require('legion');
const delay = require('legion-io-delay');
const webdriver = require('legion-selenium-webdriver');
const By = webdriver.By;
const Driver = webdriver.Driver;

const obstacle = require('legion-obstacle-course');

L.create()

  .using(obstacle)
  .using(webdriver.init(new webdriver.Builder().forBrowser('firefox')))

  .withTestcase(L.of()
    .chain(delay(5,10))
    .chain(Driver.get(obstacle.host + '/static'))
    .chain(delay(5,10))
    .chain(Driver.findElement(By.linkText('Meep')).click())
    .chain(delay(5,10))
    .chain(Driver.findElement(By.id('left')).click())
    .chain(Driver.findElement(By.id('left')).getText())
    .chain(assertEquals('meep!'))
    .chain(Driver.findElement(By.id('right')).getText())
    .chain(assertEquals('Right'))
    .chain(delay(5,10)))
  .main();

function assertEquals(x) {
  return s => {
    if( x !== s )
      throw new Error('expected ' + x + ' but found ' + s);
  };
}
