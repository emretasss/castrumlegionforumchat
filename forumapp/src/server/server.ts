import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';
import Forum from '../models/Forum'; // Doğru içe aktarma yolu

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', (room) => {
    socket.join(room);
  });

  socket.on('chatMessage', async (msg) => {
    const forumMessage = new Forum(msg);
    await forumMessage.save();
    io.to(msg.room).emit('message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('MongoDB connected');
    server.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
