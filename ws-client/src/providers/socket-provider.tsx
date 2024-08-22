import React, { useEffect, useContext, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
    socket: Socket | null;
    setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

export const SocketContext = React.createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): SocketContextType => {
    const contextVal = useContext(SocketContext);

    if (!contextVal) {
        throw new Error('useSocket must be used within a SocketProvider');
    }

    return contextVal;
};

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const token = "access_token";
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        if (token) {
            const newSocket = io('http://localhost:3001', {
                auth: { token },
                autoConnect: false,
            });

            newSocket.connect();
            setSocket(newSocket);

            newSocket.on('connect_error', (error) => {
                console.log(error);
            });

            return () => {
                newSocket.close();
            };
        }
    }, [token]);

    return (
        <SocketContext.Provider value={{ socket, setSocket }}>
            {children}
        </SocketContext.Provider>
    );
};
