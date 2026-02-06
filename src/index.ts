import { ENV } from "./config/env.config.js";
import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: ENV.PORT as number }, () => {
  console.log(`WebSocket server running on port ${ENV.PORT}`);
});

let clients = new Map<string, Set<WebSocket>>();

// socket is the client that is connecting to the server, it lets us send and receive messages
wss.on("connection", (socket) => {
  console.log("client connected to the server");

  socket.on("message", (message) => {
    const parsedMessage = JSON.parse(message.toString());


    if (parsedMessage.type === "join") {
      if (!clients.has(parsedMessage.roomId)) {
        clients.set(parsedMessage.roomId, new Set());
      }

      // add socket to the room
      clients.get(parsedMessage.roomId)?.add(socket);
      console.log(
        `${parsedMessage.name} joined the room ${parsedMessage.roomId}`,
      );
    }


    if (parsedMessage.type === "chat") {
      const currentUserRoom = clients.get(parsedMessage.roomId);
      currentUserRoom?.forEach((clientSocket) => {
        clientSocket.send(parsedMessage.payload.message);
      });
    }

  });


  socket.on("close", () => {
    clients.forEach((sockets, roomId) => {
      if (sockets.has(socket)) {
        sockets.delete(socket);
        console.log(`client left the room ${roomId}`);
      }
    });
  });
  
});
