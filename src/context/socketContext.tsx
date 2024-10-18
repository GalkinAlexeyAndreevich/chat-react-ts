import { SERVER_API_URL } from 'config';
import { createContext, useState, type FC, type ReactNode } from 'react';
import { io, type Socket } from 'socket.io-client';

interface ISocketContext {
  socket: Socket | null;
  connectSocket: (userId: number) => void;
  disconnectSocket: () => void;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = (userId: number) => {
    const newSocket = io(SERVER_API_URL, {
      query: { userId }, // Передаем userId при подключении
    });

    newSocket.on('connect', () => {
      console.log('Подключено к серверу с userId:', userId);
    });

    setSocket(newSocket);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Экспортируем только контекст
export { SocketContext };