import { Manager, Socket } from "socket.io-client"

const baseURL = new URL(import.meta.env.VITE_API_URL);
const server = new URL('/socket.io/socket.io.js', baseURL);

let socket: Socket;

export const websocketClient = (accessToken: string | null) => {
  
  if (!accessToken) return;
  const manager = new Manager(server.toString(), {
    extraHeaders: {
      authorization: accessToken,
    }
  })
  
  socket = manager.socket('/notifications');
  socket.emit('notification', 'Hola servidor desde el cliente');
}