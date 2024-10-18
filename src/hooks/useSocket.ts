import { SocketContext } from '@src/context/socketContext';
import { useContext } from 'react';

export const useSocket = () => {
  const socket = useContext(SocketContext);

  // Если socket равен null, значит компонент не находится внутри провайдера
  if (!socket) {
    throw new Error('useSocket должен быть использован внутри SocketProvider');
  }

  return socket;
};