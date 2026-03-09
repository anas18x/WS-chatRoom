import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "../services/socket.service";

type Message = {
  name: string;
  text: string;
  isSelf: boolean;
};

export const ChatRoom = () => {

  const { roomCode } = useParams();

  const [users, setUsers] = useState(1);

  const [messages, setMessages] = useState<Message[]>([]);

  const [input, setInput] = useState("");

  const username = "User"; // temporary until we pass name from Home

  /*
  Join room when component loads
  */
  useEffect(() => {

    socket.send(
      JSON.stringify({
        type: "join-room",
        payload: {
          Username: username,
          roomId: roomCode
        }
      })
    );

  }, []);

  /*
  Listen for messages from backend
  */
  useEffect(() => {

    socket.onmessage = (event) => {

      const data = JSON.parse(event.data);

      if (data.type === "chat") {

        const newMessage: Message = {
          name: data.payload.sender,
          text: data.payload.message,
          isSelf: data.payload.sender === username
        };

        setMessages((prev) => [...prev, newMessage]);
      }

    };

  }, []);

  /*
  Send chat message
  */
  const handleSend = () => {

    if (!input.trim()) return;

    socket.send(
      JSON.stringify({
        type: "chat",
        payload: {
          roomId: roomCode,
          message: input
        }
      })
    );

    setInput("");
  };

  return (
    <div className="w-full max-w-3xl bg-zinc-900 p-6 rounded-2xl border border-zinc-700 flex flex-col h-[600px]">

      {/* Header */}

      <div className="flex items-center justify-between mb-4 border-b border-zinc-700 pb-3">
        <h2 className="text-lg font-semibold">
          Room Code: {roomCode}
        </h2>

        <h2 className="text-lg font-semibold">
          Participants: {users}
        </h2>
      </div>


      {/* Chat Messages */}

      <div className="flex-1 overflow-y-auto bg-zinc-900 rounded-lg p-4 space-y-3 mb-4 border border-zinc-700">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`flex ${msg.isSelf ? "justify-end" : "justify-start"}`}
          >

            <div
              className={`max-w-[60%] px-4 py-2 rounded-lg
                ${msg.isSelf
                  ? "bg-white text-black"
                  : "bg-zinc-700 text-white"
                }`}
            >

              <p className="text-xs opacity-70 mb-1">
                {msg.name}
              </p>

              <p>{msg.text}</p>

            </div>

          </div>

        ))}

      </div>


      {/* Input Area */}

      <div className="flex gap-2">

        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 outline-none"
        />

        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-lg bg-white text-black font-medium"
        >
          Send
        </button>

      </div>

    </div>
  );
};