import React, { useEffect, useState } from "react";
import { useAuthContext } from "../authContext/AuthProvider";

const webSocketUrl = "192.168.2.104:8080";

interface WebSocketContext {
  createNewGame: () => void;
  joinGame: (gameId: string) => void;
  startGame: () => void;
  closeConnection: () => void;
}

const webSocketContext = React.createContext<WebSocketContext>({
  createNewGame: () => {},
  joinGame: () => {},
  startGame: () => {},
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

enum MessageType {
  jwt = "jwt",
  newgame = "newgame",
  joingame = "joingame",
  startgame = "startgame",
  playcard = "playcard",
  skipturn = "skipturn",
}

function sendMessage(ws: WebSocket | null, type: MessageType, data: object) {
  if (!ws) {
    console.warn(
      "Cannot send the message. WebSocket connection is not established"
    );
    return;
  }
  ws.send(JSON.stringify({ ...data, _type: type }));
  console.log(`sent ${type} message`);
}

function WebSocketProvider(props: React.PropsWithChildren<{}>) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const { token } = useAuthContext();

  function connectToWS() {
    console.log("starting connection");
    const newWs = new WebSocket(`ws://${webSocketUrl}/web-socket`);

    newWs.onopen = () => {
      console.log("Connected to server");
      // todo error handling
      sendMessage(newWs, MessageType.jwt, { jwt: `Bearer ${token}` });
      // todo: handle negative case
      console.log("Connection approved");
    };
    newWs.onmessage = (data) => {
      console.log("Message received: ");
      console.log({ data });
    };

    setWs(newWs);
  }

  function createNewGame() {
    sendMessage(ws, MessageType.newgame, {});
  }

  function startGame() {
    sendMessage(ws, MessageType.startgame, {});
  }

  function joinGame(gameId: string) {
    sendMessage(ws, MessageType.joingame, { gameId: gameId });
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
      value={{ createNewGame, joinGame, startGame, closeConnection }}
    >
      {props.children}
    </webSocketContext.Provider>
  );
}

export default WebSocketProvider;
