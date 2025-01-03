import { io } from 'socket.io-client';

const token = localStorage.getItem('token');
const socket = io('http://localhost:5000', {
  query: { token }
});

socket.on('staffConnected', (data) => {
  console.log(data.message); // Log the message to confirm the connection
});

export default socket;