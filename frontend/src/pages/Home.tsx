import { IoChatboxEllipses } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../services/room.service";
import { socket } from "../services/socket.service";
import { joinRoom } from "../services/room.service";


export const Home = () => {

  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "room-created") {
        setCreatedRoomId(data.payload.roomId);
      }

      if (data.type === "room-joined") {
        navigate(`/room/${data.payload.roomId}`, { state: { name } });
      }

      if (data.type === "error") {
        alert(data.payload.message);
      }
    };
  }, [name, navigate]);

  return (
    <div className="w-full max-w-lg bg-zinc-900 p-4 rounded-2xl border border-zinc-900">

      <h1 className="flex items-center gap-2 text-2xl font-semibold mb-2">
        <IoChatboxEllipses className="text-3xl"/>
        Real Time Chat
      </h1>

      <p className="text-sm text-zinc-400 mb-6">
        temporary room that expires after all users exit
      </p>

      {createdRoomId ? (

        <div className="space-y-4">

          <p className="text-white text-center">
            Share this code with your friend
          </p>

          <div className="bg-zinc-900 rounded-lg p-4 text-center text-xl font-semibold">
            {createdRoomId}
          </div>

          <button
            onClick={() => navigate(`/room/${createdRoomId}`, { state: { name } })}
            className="w-full py-2 rounded-lg bg-zinc-300 text-black font-medium"
          >
            Enter Chat Room
          </button>

        </div>

      ) : (

        <>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full mb-3 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={() => createRoom(name)}
            className="w-full mb-4 py-2 rounded-lg bg-white text-black font-medium cursor-pointer"
          >
            Create New Room
          </button>

          <div className="flex gap-2">

            <input
              type="text"
              placeholder="Enter Room ID"
              className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 outline-none"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />

            <button
              onClick={() => {joinRoom(name, roomId)
              } }
              className="px-4 py-2 rounded-lg bg-white cursor-pointer font-medium text-black"
            >
              Join
            </button>

          </div>
        </>

      )}
    </div>
  );
};