import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import menuRoutes from './routes/menu.item.route.js';
import orderRoutes from './routes/order.route.js';
import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';
import notificationRoutes from './routes/notification.route.js';
import User from './models/userModels.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

io.on('connection', async (socket) => {
  console.log('a user connected');
  
  // Check if the user is a staff user
  const token = socket.handshake.query.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user && user.role === 'staff') {
        console.log('Staff user connected:', user.email);
        socket.emit('staffConnected', { message: 'Staff user connected' });
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  }

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

export const emitOrderStatusUpdate = (notification) => {
  io.emit('orderStatusUpdate', notification);
};

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});