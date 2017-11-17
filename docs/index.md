Getting Started With Legion
===========================

**Thank you for your patience while we set up new documentation. Anything you
find here may be incomplete.**

This is the homepage for the legion-starter-pack. If you just want to jump in,
clone and build this repository:

	git clone https://github.com/lane-webperformance/legion-starter-pack.git
	cd legion-starter-pack
	npm install
	node testcase.js

You can edit the `testcase.js` file to do anything you need. But before you do,
the legion-starter-pack also contains examples and documentation to help you
succeed.

Background Information
----------------------

A 2016 real-world [case study](./case_study.md) about using Legion to test a
proprietary binary protocol.

What are you trying to do?
--------------------------

[Example 1](./generated/001_simple.js.html): Create a basic test case with HTTP GET requests.

[Example 2](./generated/002_ticket.js.html): Reuse a value from previous HTTP response in a later HTTP request.

[Example 3](./generated/003_login_dataset.js.html): Pick a unique value from a small list of values, and submit it in an HTTP request.

[Example 4](./generated/004_selenium_webdriver.js.html): Build a test case with Selenium WebDriver.

