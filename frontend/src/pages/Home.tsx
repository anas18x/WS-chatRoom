import { IoChatboxEllipses } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {

  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);

  const navigate = useNavigate();


  return (
    <div className="w-full max-w-lg bg-zinc-900 p-4 rounded-2xl border border-zinc-900">


      <h1 className="flex items-center gap-2 text-2xl font-semibold mb-2">
        <IoChatboxEllipses className="text-3xl"/>
        Real Time Chat
      </h1>

      <p className="text-sm text-zinc-400 mb-6">
        temporary room that expires after all users exit
      </p>

      {/* If room created */}

      {createdRoomId ? (

        <div className="space-y-4">

          <p className="text-zinc-300">
            Share this code with your friend
          </p>

          <div className="bg-zinc-900 rounded-lg p-4 text-center text-xl font-semibold">
            {createdRoomId}
          </div>

          <button
            onClick={() => navigate(`/room/${createdRoomId}`)}
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
            onChange={(e) => {
                setName(e.target.value);
            }}
          />
       


          <button
            disabled={!name.trim()}
            className="w-full mb-4 py-2 rounded-lg bg-white text-black font-medium disabled:opacity-50 cursor-pointer"

          >
            Create New Room
          </button>


          <div className="flex gap-2">

            <input
              type="text"
              placeholder="Enter Room Code"
              className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 outline-none "
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
            />

            <button
              onClick={() => navigate(`/room/${roomCode}`)}
              className="px-4 py-2 rounded-lg bg-zinc-100 cursor-pointer font-medium text-black"
            >
              Join
            </button>

          </div>
        </>

      )}

    </div>
  );
};