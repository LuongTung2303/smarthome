import React, { createContext, useContext, useEffect, useState } from "react";
import socket from "./socket";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }) {
  const [socketData, setSocketData] = useState({});

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected");
      // Đăng ký các feeds bạn muốn lắng nghe ở đây hoặc từ component
      socket.emit("subscribe_feeds", ['button1', 'button2', 'button3', 'button4', 'button5', 'sensor1', 'sensor2', 'sensor3', 'sensor4', 'lock']);
    });

    socket.on("mqtt_message", (data) => {
      console.log("Received: ", data)
      setSocketData((prev) => ({
        ...prev,
        [data.feed]: data.data,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, socketData }}>
      {children}
    </SocketContext.Provider>
  );
}