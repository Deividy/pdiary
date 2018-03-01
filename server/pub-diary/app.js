const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { Client } = require('pg');

const zmq = require('zmq');
const publisher = zmq.socket('pub');
publisher.bindSync(process.env.PUBLISHER_HOST);

async function main () {
  const client = new Client(process.env.PSQL_CONN_STRING);
  await client.connect();

  client.on('notification', function (msg) {
      publisher.send(msg.payload);
  });

  client.query('LISTEN diary_entry_change');

  console.log(`LIVE publish zmq at ${process.env.PUBLISHER_HOST}`);
}

main();
