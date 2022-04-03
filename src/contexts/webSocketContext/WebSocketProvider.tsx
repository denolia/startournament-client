import React, { useEffect, useState } from "react";

const webSocketUrl = "192.168.2.104:8080";

interface WebSocketContext {
  connectToWS: () => void;
  sendMessage: (msg: string) => void;
  closeConnection: () => void;
}

const webSocketContext = React.createContext<WebSocketContext>({
  connectToWS: () => {},
  sendMessage: (msg: string) => {},
  closeConnection: () => {},
});

export function useWebSocketContext(): WebSocketContext {
  const context = React.useContext(webSocketContext);

  if (!context) {
    throw new Error(
      "useWebSocketContext must be called inside the WebSocketProvider"
    );
  }

  return context;
}

function WebSocketProvider(props: React.PropsWithChildren<{}>) {
  const [ws, setWs] = useState<WebSocket | null>(null);

  function connectToWS() {
    console.log("starting connection");
    const newWs = new WebSocket(`ws://${webSocketUrl}/web-socket`);

    newWs.onopen = () => {
      console.log("Connected to server");
    };
    newWs.onmessage = (data) => {
      console.log("Message: ");
      console.log({ data });
    };

    setWs(newWs);
  }

  function sendMessage(msg: string) {
    const message = "how are you";
    if (!ws) {
      console.warn(
        "Cannot send the message. WebSocket connection is not established"
      );
      return;
    }
    ws.send(JSON.stringify({ content: message }));
  }

  function closeConnection() {
    if (!ws) {
      console.warn(
        "Cannot close connection. WebSocket connection is not established"
      );
      return;
    }
    ws.close();
  }

  useEffect(() => {
    console.log("connecting...");
    connectToWS();
  }, []);

  return (
    <webSocketContext.Provider
      value={{ connectToWS, sendMessage, closeConnection }}
    >
      {props.children}
    </webSocketContext.Provider>
  );
}

export default WebSocketProvider;
