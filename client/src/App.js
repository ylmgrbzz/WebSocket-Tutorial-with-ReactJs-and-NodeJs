import "./App.css";
import React, { useState, useEffect } from "react";

const socket = new WebSocket("ws://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.onopen = () => {
      console.log("connected");
    };
    socket.onmessage = (event) => {
      console.log(event.data);
      // const message = event.data;
      const message = JSON.parse(event.data);
      const timestamp = new Date().toLocaleString();

      setMessages((prevMessages) => [
        ...prevMessages,
        { content: message, timestamp },
      ]);
    };

    socket.onerror = (error) => {
      console.log(error);
    };

    socket.onclose = () => {
      console.log("disconnected");
    };
  }, []);

  const handleMessage = (e) => {
    setMessage(e.target.value);
    console.log(message);
  };

  const sendMessage = () => {
    if (socket.readyState === WebSocket.OPEN) {
      const messageObject = {
        content: message,
        timestamp: new Date().toLocaleString(),
      };
      socket.send(JSON.stringify(messageObject));
      setMessage("");
    }
  };

  return (
    <div className="App">
      <h1>WebSocket Chat</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your message"
          value={message}
          onChange={handleMessage}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
