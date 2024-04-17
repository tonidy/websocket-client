const io = require('socket.io-client');

// Connect to the WebSocket server
const socket = io('https://vidio.stg.starcade.co', {
  query: {
    token: 'UNITY-TsszHgZ6dULmPzR' // Provide the token for authentication
  }
});

// Handle connection event
socket.on('connect', () => {
  console.log('Connected to server');

  // Send a 'hello' message to the server
  socket.emit('hello', { message: 'Hello from client' });
  //socket.emit('spin');
//   socket.emit('spin', { message: 'Spin' });
//   socket.emit('class', { message: 'Class' });
});

// Handle 'hello' message from the server
socket.on('hello', (data) => {
  console.log('Received hello message from server:', data);
});

// Handle 'spin' message from the server
socket.on('spin', (data) => {
  console.log('Received spin message from server:', data);
});

// Handle 'class' message from the server
socket.on('class', (data) => {
  console.log('Received class message from server:', data);
});

// Handle disconnection event
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
