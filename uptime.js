'use strict';

// In an automated deployment, this provides a way to verify that
// a particular instance of legion is up and running.

const http = require('http');
const process = require('process');

const start = Date.now();

if( process.env.LEGION === 'cloud' ) {
  const server = http.createServer(handle);

  server.listen(80, () => console.log('Running uptime server.'));
}

function handle(request,response) {
  response.end('Uptime ' + uptime());
}

function uptime() {
  return Math.round((Date.now() - start)/1000/60).toString() + 'm';
}
