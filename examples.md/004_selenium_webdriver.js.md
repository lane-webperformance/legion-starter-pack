	#!/usr/bin/env node
	'use strict';

Using Selenium-Webdriver with Legion
====================================

This article will assume a basic familiarity with the selenium-webdriver
API for Node.js.

Legion's support for webdriver consists of a very small layer that provides
a Driver instance for every virtual user and instruments most webdriver calls.

This binding is an optional component. If you wish, you can forgo the binding
and use vanilla selenium-webdriver with sections ((TODO: link to sections article)).
You can even switch between the binding and vanilla using 'Driver().chain(driver => {})'.
Everything inside the chain will have access to the vanilla Driver instance.

	const L = require('legion');
	const delay = require('legion-io-delay');
	const obstacle = require('legion-obstacle-course').http;

Importing the binding looks very similary to importing vanilla webdriver:

	const webdriver = require('legion-selenium-webdriver');
	
	const By = webdriver.By;
	const Driver = webdriver.Driver;

To use the binding, first create a testcase that uses it. This binding
also uses the Obstacle Course.

	L.create()
	  .using(obstacle)
	  .using(webdriver.init(new webdriver.Builder().forBrowser('firefox')))

Then, use a Driver() to get the Driver instance for your virtual user. You can make ordinary selenium API calls.

If you want to take the result an API call, use 'chain' instead of 'then':

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

Gotchyas
========

As of this writing, selenium-webdriver uses a "promise manager." Among other things, the manager might force all selenium calls to operate in sequence, even if that isn't explicitly spelled out in your script, **and even if the calls are made by different virtual users**. This will mess up all of your results if it means that calls from one virtual user have to wait for another virtual user to release control. You can work around this with ((TODO: there's an environment or global variable or something)).

If you don't like that solution, you can also just run one Legion process per virtual user anyway. The overhead from running multiple instances of node is considerably less than the overhead of running multiple instances of your browser.

