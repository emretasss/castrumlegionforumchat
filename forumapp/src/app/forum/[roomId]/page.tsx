// src/app/forum/[roomId]/page.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

interface Message {
  _id: string;
  userName: string;
  text: string;
  createdAt: string;
}

const RoomPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const { roomId } = useParams<{ roomId: string }>();

  // Ensure environment variable is defined
  const socketUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!socketUrl) {
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not defined");
  }

  const socket = io(socketUrl);

  useEffect(() => {
    if (roomId) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get<Message[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}/messages`);
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();

      socket.emit('join_room', roomId);

      socket.on('receive_msg', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socket.off('receive_msg');
      };
    }
  }, [roomId, socket]);

  const sendMessage = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}/messages`, {
        text: newMessage,
        userName,
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h1>Room {roomId}</h1>
      <div>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Your name"
        />
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="New message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages.map((message) => (
          <div key={message._id}>
            <strong>{message.userName}:</strong> {message.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomPage;
