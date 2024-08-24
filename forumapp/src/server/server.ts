import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import { connectDB } from '../lib/mongodb'; // MongoDB bağlantı fonksiyonunu içe aktar
import Message from '../models/Message'; // Mesaj modelini içe aktar

// HTTP sunucusu oluştur
const httpServer = http.createServer();

// Socket.io sunucusu oluştur ve HTTP sunucusuna bağla
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: 'http://localhost:3000', // React uygulamanızın çalıştığı URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

// MongoDB bağlantısı kur
const initializeDB = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

// Socket.io olaylarını yönet
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Odaya katılma
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
    console.log(`User with id-${socket.id} joined room - ${roomId}`);
  });

  // Mesaj gönderme
  socket.on('send_msg', async (data) => {
    console.log('Received message data:', data);
    
    try {
      // Veritabanına mesaj kaydet
      const newMessage = new Message({
        roomId: data.roomId,
        userName: data.userName,
        text: data.text,
      });
      await newMessage.save();
  
      // Mesajı belirli bir odaya gönder
      io.to(data.roomId).emit('receive_msg', data);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Bağlantı kesildiğinde
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

// Veritabanı bağlantısını başlat
initializeDB();
