// small and simple! :)

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const http = require('http');

const zmq = require('zmq');
const sub = zmq.socket('sub');

const io = require('socket.io');

const httpServer = http.createServer(function (req, res) { });
const socketIoInstance = io(httpServer);


async function validateAccessToLink (headers, link) {
  const opts = {
    host: process.env.AUTH_SERVICE_HOST,
    port: process.env.AUTH_SERVICE_PORT,
    path: `/${link}`,
    headers: {
      authorization: headers.authorization || ''
    }
  };

  return new Promise(function (resolve, reject) {
    http.get(opts, function (res) {
      if (res.statusCode === 200) return resolve();

      reject('Invalid status code');
    }).on('error', reject);
  });
}

function handleMessage (msg) {
  msg = msg.toString();
  const objectMessage = JSON.parse(msg);

  socketIoInstance.sockets.in(objectMessage.diaryLink).emit('data', msg);
}

// TODO MUST fix exployt when user has no access to diary
function handleSocketConnect (socket) {
  const { diaryLink } = socket.handshake.query;
  socket.join(diaryLink);
}

async function handleSocketHandshake (socket, next) {
  try {
    const { diaryLink, jwt } = socket.handshake.query;

    await validateAccessToLink({ authorization: `Bearer ${jwt}` }, diaryLink);
    next();
  } catch (ex) {
    console.error(ex);

    next('Unauthorized');
  }
}

socketIoInstance.use(handleSocketHandshake);
socketIoInstance.on('connect', handleSocketConnect);
sub.on('message', handleMessage);

sub.subscribe('');
sub.connect(process.env.PUBLISHER_HOST);

httpServer.listen(process.env.SOCKET_IO_PORT);
console.log(`socket ALIVE! port: ${process.env.SOCKET_IO_PORT}`);
