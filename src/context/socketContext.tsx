import { SERVER_API_URL } from '@src/config';
import { createContext, useCallback, useState, type FC, type ReactNode } from 'react';
import { io, type Socket } from 'socket.io-client';

interface ISocketContext {
  socket: Socket | null;
  connectSocket: (userId: number) => (() => void);
  disconnectSocket: () => void;
}

const SocketContext = createContext<ISocketContext | null>(null);

export const SocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectSocket = useCallback((userId: number):(() => void) => {
    const newSocket = io(SERVER_API_URL, {
      transports: ['websocket'],
      reconnectionAttempts: 5,
      query: { userId }, // Передаем userId при подключении
    });

    newSocket.on('connect', () => {
      console.log('Подключено к серверу с userId:', userId);
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  },[setSocket]);

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

// Экспортируем только контекст
export { SocketContext };