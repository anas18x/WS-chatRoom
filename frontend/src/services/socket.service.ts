
export const socket = new WebSocket("ws://localhost:3000");
socket.onopen = () => {
  console.log("WebSocket connection established");
}

socket.onerror = (error) => {
  console.error("WebSocket error:", error);
}