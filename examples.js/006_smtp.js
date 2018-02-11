#!/usr/bin/env node
'use strict';
const SMTPConnection = require('nodemailer/lib/smtp-connection');
const port = require('legion-obstacle-course').port;
const util = require('util');

async function setup() {
  const connection = new SMTPConnection({
    host: 'localhost',
    port: port,
    tls: { rejectUnauthorized: false }
  });

  await util.promisify(callback => connection.connect(callback))();

  return connection;
}
function send(connection, from, to, message) {
  return util.promisify(callback => connection.send({ from, to }, message, callback))();
}
const L = require('legion');

L.create()
  .withBeforeTestAction(startTestServer)
  .withAfterTestAction(stopTestServer)
  .withTestcase(L.of().chain(async () => {
    const connection = await setup();
    await send(connection, 'alice@example.com', 'bob@example.com', 'hello, bob');
    connection.quit();
  }))

  .main();
function startTestServer(state) {
  const SMTPServer = require('smtp-server').SMTPServer;

  const server = new SMTPServer({ authOptional: true }).listen(port);

  return state.withService('custom-smtp-server', server);
}

function stopTestServer(state) {
  state.getService('custom-smtp-server').close();
}
