const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for Express.js

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000', // Replace with your allowed origin
    methods: ['GET', 'POST'], // Specify the allowed HTTP methods
  },
});

io.on('connection', socket => {
  console.log('A user connected');

  console.log("user connected with id",socket.client.id);

  socket.on('message', message => {
    console.log('Received message:', message);
    io.emit('message', message); // Broadcast the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
