const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

let hospitalRooms = {}; // Track online doctors per hospital

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('joinHospital', ({ hospitalId }) => {
    socket.join(hospitalId);
    console.log(`User joined hospital ${hospitalId}`);
  });

  socket.on('sendMessage', ({ text, hospitalId, sender }) => {
    io.to(hospitalId).emit('message', { text, sender });
  });

  socket.on('doctorOnline', ({ hospitalId }) => {
    hospitalRooms[hospitalId] = true;
    io.emit('hospitalStatus', { hospitalId, status: 'online' });
  });

  socket.on('doctorOffline', ({ hospitalId }) => {
    hospitalRooms[hospitalId] = false;
    io.emit('hospitalStatus', { hospitalId, status: 'offline' });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
