import {socket} from "./socket.service"

export const createRoom = (username : string) => {

    if(!username.trim()) {
        alert("Username is required to create a room");
        return;
    }

    socket.send(JSON.stringify({
        type: "create-new-room",
        payload: {
            Username: username
        }
    }))  
}  


export const joinRoom = (username: string, roomId: string) => {

  if (!roomId.trim()) {
    alert("Enter room ID");
    return;
  }

  socket.send( JSON.stringify({
      type: "join-room",
      payload: {
        Username: username,
        roomId: roomId
      }
    })
  );

};