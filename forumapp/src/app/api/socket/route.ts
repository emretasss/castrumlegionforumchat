import { NextResponse } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

const handler = (req: Request) => {
  const res = NextResponse.json({});
  
  if (res.socket.server.io) {
    console.log('Socket.IO server already running');
    return res;
  }

  const server = http.createServer((req, res) => res.end());
  const io = new SocketIOServer(server, {
    cors: {
      origin: "http://localhost:3000", // Frontend URL
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (msg) => {
      io.emit('message', msg);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  server.listen(3001, () => {
    console.log('Socket.IO server running on port 3001');
  });

  res.socket.server.io = io;
  return res;
};

export { handler as GET, handler as POST };
