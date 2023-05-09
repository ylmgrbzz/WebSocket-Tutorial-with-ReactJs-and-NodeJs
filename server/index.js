const express = require("express");
const WebSocket = require("ws");

const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

const connections = [];

wss.on("connection", (ws) => {
  connections.push(ws);

  ws.on("message", (message) => {
    console.log("received: %s", message);
    connections.forEach((connection) => {
      if (connection !== ws && connection.readyState === WebSocket.OPEN) {
        connection.send(message);
        console.log("sent: %s", message);
      }
    });
  });

  ws.on("close", () => {
    connections.splice(connections.indexOf(ws), 1);
  });

  //   const timer = setInterval(() => {
  //     const data = "Merhaba! Bu bir örnek veridir.";
  //     ws.send(data);
  //   }, 3000);

  //   ws.on("close", () => {
  //     clearInterval(timer);
  //   });
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
