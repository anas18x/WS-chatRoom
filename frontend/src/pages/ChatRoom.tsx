import { useParams } from 'react-router-dom';

export const ChatRoom = () => {
     const { roomId } = useParams();

  return (
    <div className="w-full max-w-3xl bg-zinc-800 p-6 rounded-2xl border border-zinc-700">

      <h2 className="text-lg font-semibold mb-4">
        Room: {roomId}
      </h2>

      <div className="h-[400px] bg-zinc-900 rounded-lg p-4">
        Chat messages will appear here
      </div>

    </div>
  );
}