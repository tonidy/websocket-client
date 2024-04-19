const io = require('socket.io-client');
const readline = require('readline');

// URL: https://vidio.stg.starcade.co
// token: UNITY-TsszHgZ6dULmPzR
// Connect to the WebSocket server
const socket = io('http://localhost:3000', {
  query: {
    token: 'UNITY' // Provide the token for authentication
  }
});

// Create interface for input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt menu function
function promptMenu() {
  rl.question('Choose an option:\n1. Send "hello" message\n', (option) => {
    if (option.trim() === '1') {
      socket.emit('hello', { message: `Hello from client ${new Date().getTime()}` });
    } else {
      console.log('Invalid option.');
    }
    promptMenu(); // Call itself recursively for a forever loop
  });
}

// Handle connection event
socket.on('connect', () => {
  console.log('Connected to server');

  // Send a 'hello' message to the server
  socket.emit('hello', { message: 'Hello from client' });

  // Start prompt menu
  promptMenu();
});

// Handle 'hello' message from the server
socket.on('hello', (data) => {
  console.log('Received hello message from server:', data);
});

// Handle disconnection event
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Listen for Ctrl + C to exit
rl.on('SIGINT', () => {
  console.log('\nExiting...');
  rl.close();
  process.exit();
});
