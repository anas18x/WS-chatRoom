import { ENV } from "./config/env.config.js";
import { WebSocketServer , WebSocket} from "ws";
const wss = new WebSocketServer({port : ENV.PORT as number}, () => {
    console.log(`WebSocket server running on port ${ENV.PORT}`)
})


let clients : WebSocket[] = []

// socket is the client that is connecting to the server, it lets us send and receive messages
wss.on('connection',(socket: WebSocket)=>{
        clients.push(socket)
     console.log("client connected to the server")
     socket.send("Welcome to the WebSocket server!")

     socket.on('message',(message)=>{
        console.log(`message Received from client : ${message.toString()}`)

        // Broadcast the message to all connected clients
        clients.forEach((client)=>{
            client.send(`Message from client : ${message.toString()}`)
        })
     })


})