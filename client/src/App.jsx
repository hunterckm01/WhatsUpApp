import { useEffect, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(()=>{
    socket.on('chat message', (msg)=>{
      setMessages((prev)=>[...prev, msg]);
    })

    return ()=>socket.off("chat message");
  },[])

  const sendMessage = (e) =>{
    e.preventDefault();
    if(message.trim()){
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
