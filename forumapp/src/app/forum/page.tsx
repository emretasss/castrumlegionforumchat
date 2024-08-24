"use client";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "./page.module.css";

// Socket.io bağlantısı
const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5001");

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [messages, setMessages] = useState<{ userName: string; text: string; createdAt: string }[]>([]);
  const [currentMsg, setCurrentMsg] = useState("");

  // Bağlantı ve olay dinleyicileri
  useEffect(() => {
    console.log('Room ID değişti:', roomId); // Log ekleme

    if (roomId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}/messages`)
        .then(response => response.json())
        .then(data => {
          console.log('Mesajlar alındı:', data); // Log ekleme
          setMessages(data);
        })
        .catch(error => console.error('Mesajları alma hatası:', error));
    }

    socket.on("receive_msg", (msgData) => {
      console.log('Yeni mesaj alındı:', msgData); // Log ekleme
      setMessages(prevMessages => [...prevMessages, msgData]);
    });

    return () => {
      socket.off("receive_msg");
    };
  }, [roomId]);

  const handleJoin = () => {
    if (userName !== "" && roomId !== "") {
      socket.emit("join_room", roomId);
      console.log('Odaya katıl:', roomId); // Log ekleme
      setShowSpinner(true);
      setTimeout(() => {
        setShowChat(true);
        setShowSpinner(false);
      }, 1000);
    } else {
      alert("Please fill in Username and Room Id");
    }
  };

  const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData = {
        roomId,
        userName,
        text: currentMsg,
        createdAt: new Date().toISOString(),
      };
      console.log('Gönderilen mesaj verisi:', msgData); // Log ekleme
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(msgData),
      });
      setCurrentMsg("");
    }
  };

  return (
    <div>
      <div
        className={styles.main_div}
        style={{ display: showChat ? "none" : "" }}
      >
        <input
          className={styles.main_input}
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          disabled={showSpinner}
        />
        <input
          className={styles.main_input}
          type="text"
          placeholder="Room ID"
          onChange={(e) => setRoomId(e.target.value)}
          disabled={showSpinner}
        />
        <button className={styles.main_button} onClick={() => handleJoin()}>
          {!showSpinner ? "Join" : <div className={styles.loading_spinner}></div>}
        </button>
      </div>
      {showChat && (
        <div className={styles.chat_div}>
          <div className={styles.chat_border}>
            <div style={{ marginBottom: "1rem" }}>
              <p>Name: <b>{userName}</b> and Room ID: <b>{roomId}</b></p>
            </div>
            <div>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.userName === userName
                      ? styles.chatProfileRight
                      : styles.chatProfileLeft
                  }
                >
                  <span
                    className={styles.chatProfileSpan}
                    style={{ textAlign: message.userName === userName ? "right" : "left" }}
                  >
                    {message.userName.charAt(0)}
                  </span>
                  <h3 style={{ textAlign: message.userName === userName ? "right" : "left" }}>
                    {message.text}
                  </h3>
                </div>
              ))}
            </div>
            <div>
              <form onSubmit={(e) => sendData(e)}>
                <input
                  className={styles.chat_input}
                  type="text"
                  value={currentMsg}
                  placeholder="Type your message.."
                  onChange={(e) => setCurrentMsg(e.target.value)}
                />
                <button className={styles.chat_button}>Send</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
