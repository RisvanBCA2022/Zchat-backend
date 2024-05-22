// app.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './Routes/userRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import messageRoutes from './Routes/messagesRoute.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';
import socketEvents from './Controllers/socketEvents.js'; // Import socketEvents module

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('mongodb connection successfull'))
  .catch((error) => console.log(error.message));

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const server = http.createServer(app);
const io = new Server(server);

// Initialize Socket.IO event handling
socketEvents(io);

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

export default app;
