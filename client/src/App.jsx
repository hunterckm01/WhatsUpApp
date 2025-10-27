import { useEffect, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client';

const socket = io("http://localhost:4000", {
  transports: ["websocket"],
});

socket.on("connect", () => {
  console.log("✅ Connected to server with ID:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Connection error:", err.message);
});


function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    
    socket.on('chat message', (msg) => {
      console.log("Message received:", msg);
      setMessages((prev) => [...prev, msg]);
    });
    return ()=>socket.off("chat message");
  },[])

  const sendMessage = (e) =>{
    e.preventDefault();
    if(message.trim()){
      console.log("Sending message", message);
      socket.emit('chat message', message);
      setMessage('');
    }
  }

  return (
    <>
      <ul id="messages">
        {messages.map((msg, i)=>(<p key = {i}>{msg}</p>))}
      </ul>
      <form id="form" action="" onSubmit={sendMessage}>
        <input id="input" autocomplete="off" 
            value = {message}
            onChange = {(e)=>setMessage(e.target.value)}/>
        <button>Send</button>
      </form>
    </>
  );
}

export default App
