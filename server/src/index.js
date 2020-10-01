const express = require('express');
const socket = require('socket.io');

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static('public'));

// Socket setup
const io = socket(server);

const connectedUsers = new Map();

io.on('connection', function (socket) {
  const { user } = socket.handshake.query;

  connectedUsers.set(socket.handshake.query.user, socket);
  console.log(`New connection: ${user}`);
  console.log(socket.handshake.query.user);

  socket.on('controller-play-pause', data => {
    console.log(data);

    io.emit('controller-play-pause', 'from server');
  });

  socket.on('controller-stop', data => {
    console.log(data);

    io.emit('controller-stop', 'from server');
  });

  socket.on('controller-back', data => {
    console.log(data);

    io.emit('controller-back', 'from server');
  });

  socket.on('controller-forward', data => {
    console.log(data);

    io.emit('controller-forward', 'from server');
  });
});
