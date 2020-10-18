import cors from 'cors';
import express from 'express';
import socketio from 'socket.io';

import mediaRoutes from './routes/mediaRoutes';
import videoStreamRoutes from './routes/videoStreamRoutes';

// App setup
const PORT = 5000;
const app = express();

app.use(cors());

// Routes
app.use('/api', videoStreamRoutes);
app.use('/api', mediaRoutes);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Socket setup
const io = socketio(server);

const connectedUsers = new Map();

io.on('connection', (socket) => {
  const { user } = socket.handshake.query;

  connectedUsers.set(socket.handshake.query.user, socket);
  console.log(`New connection: ${user}`);
  console.log(socket.handshake.query.user);

  socket.on('controller-play-pause', (data) => {
    console.log(data);

    io.emit('controller-play-pause', 'from server');
  });

  socket.on('controller-stop', (data) => {
    console.log(data);

    io.emit('controller-stop', 'from server');
  });

  socket.on('controller-back', (data) => {
    console.log(data);

    io.emit('controller-back', 'from server');
  });

  socket.on('controller-forward', (data) => {
    console.log(data);

    io.emit('controller-forward', 'from server');
  });

  socket.on('controller-media-change', (data) => {
    console.log(data);

    io.emit('controller-media-change', data);
  });
});
