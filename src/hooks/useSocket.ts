import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

export const useSocket = (roomId: string | null) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const connect = useCallback(() => {
    if (socketRef.current?.connected) {
      if (roomId) {
        socketRef.current.emit('join-room', roomId);
      }
      return socketRef.current;
    }
    
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL);

      socketRef.current.on('connect', () => {
        setIsConnected(true);
        if (roomId) {
          socketRef.current?.emit('join-room', roomId);
        }
      });

      socketRef.current.on('disconnect', () => {
        setIsConnected(false);
      });
    }

    return socketRef.current;
  }, [roomId]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    }
  }, []);

  useEffect(() => {
    if (roomId) {
      const socket = connect();
      // If already connected, emit join-room immediately
      if (socket.connected) {
        socket.emit('join-room', roomId);
      }
    }
  }, [roomId, connect]);

  const emitTransfer = useCallback((transfer: any) => {
    if (socketRef.current && isConnected && roomId) {
      socketRef.current.emit('transfer-update', { roomId, transfer });
    }
  }, [isConnected, roomId]);

  const emitSyncState = useCallback((state: any) => {
    if (socketRef.current && isConnected && roomId) {
      socketRef.current.emit('sync-state', { roomId, state });
    }
  }, [isConnected, roomId]);

  const requestSync = useCallback(() => {
    if (socketRef.current && isConnected && roomId) {
      socketRef.current.emit('request-sync', roomId);
    }
  }, [isConnected, roomId]);

  return {
    socket: socketRef.current,
    isConnected,
    emitTransfer,
    emitSyncState,
    requestSync,
    connect,
    disconnect
  };
};
