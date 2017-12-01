Legion: Status and Future Plans
============================================

Last update: November 2017.

Over the past two years, my employer, Web Performance, Inc, has supported my
work on Legion when my other duties permit. The result has been a very flexible
suite of software that has given us the ability to take on work that would
otherwise be beyond the scope of our usual tools.

That being said. Legion remains experimental. Legion may be most appropriate
for the unusual edge cases: proprietary, eccentric, or unusual protocols, or
project requirements that other tools can't handle, or if you want to write
your load test using your own Node.js client APIs.

Legion absolutely shines when it comes to interoperating with other JavaScript
libraries. The entire Selenium-WebDriver integration is only 31 lines of code,
including white space.  And you don't even have to use it: many tests can be
written in vanilla async-await-style JavaScript and in the really worst case,
you can even write test cases in synchronous code.

Currently Legion's biggest shortage is a lack of GUI tools to analyze results.
Scanning Legion's JSON output for the correct tags and converting into
reportable data is not for the faint of heart. Developing appropriate tools
will be the next major focus of my work.

For the time being, if you're thinking about using Legion, consider visiting
our [gitter](https://gitter.im/legion-starter-pack/Lobby#) and letting us know
about your use case. I'll be happy to recommend best practices for Legion or
direct you to other tools that might be more appropriate for you, if I know of
them.

Likewise, If you become aware of any lacking documentation or anything about
your experience that could be smoother, please file a ticket on
[github](https://github.com/lane-webperformance/legion-starter-pack/issues) (or
on the appropriate sub-project, if you already know where it should go).

Thanks,
--Christopher Lane Hinson
