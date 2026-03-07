import { WebSocket } from "ws";

export function broadcastToRoom(
  roomId: string,
  data: any,
  socketsInfo: Map<WebSocket, { roomId: string; name: string }>,
  excludeSocket?: WebSocket
) {

  socketsInfo.forEach((info, clientSocket) => {

    if (
      info.roomId === roomId &&
      clientSocket.readyState === WebSocket.OPEN &&
      clientSocket !== excludeSocket
    ) {
      clientSocket.send(JSON.stringify(data));
    }

  });

}