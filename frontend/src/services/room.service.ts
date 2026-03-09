import {socket} from "./socket.service"

export const createRoom = (username : string) => {

    console.log("called createRoom with username:", username);

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