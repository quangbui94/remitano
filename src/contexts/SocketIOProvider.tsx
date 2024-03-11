import { createContext, useContext } from "react";
import { Socket, io } from "socket.io-client";

interface SocketContextType {
  socket: Socket;
}

interface SocketProviderChildren {
  children: React.ReactNode;
}

const SocketContext = createContext<SocketContextType>({ socket: io() });

export const useSocket = (): SocketContextType => {
  const context = useContext(SocketContext);

  return context!;
};

export const SocketProvider: React.FC<SocketProviderChildren> = ({
  children,
}) => {
  const socket = io(process.env.REACT_APP_BACKEND_URL!, {
    transports: ["websocket"],
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
