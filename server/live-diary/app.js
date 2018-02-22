// small and simple! :)

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const http = require('http');

const zmq = require('zmq');
const sub = zmq.socket('sub');

const io = require('socket.io');

const httpServer = http.createServer(function (req, res) { });
const socketIoInstance = io(httpServer);

function handleMessage (msg) {
  msg = msg.toString();
  const objectMessage = JSON.parse(msg);

  socketIoInstance.sockets.in(objectMessage.diaryLink).emit('data', msg);
}

function handleSocketConnect (socket) {
  const { diaryLink } = socket.handshake.query;
  socket.join(diaryLink);
}

socketIoInstance.on('connect', handleSocketConnect);
sub.on('message', handleMessage);

sub.subscribe('');
sub.connect(process.env.PUBLISHER_HOST);

httpServer.listen(process.env.SOCKET_IO_PORT);
console.log(`socket ALIVE! port: ${process.env.SOCKET_IO_PORT}`);
