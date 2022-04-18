import React, { useEffect, useState } from "react";
import { useAuthContext } from "../authContext/AuthProvider";
import { MessageType } from "../authContext/types";

const webSocketUrl = "192.168.2.104:8080";

interface WebSocketContext {
  createNewGame: () => void;
  joinGame: (gameId: string) => void;
  startGame: () => void;
  closeConnection: () => void;
  subscribeToMessage: (type: MessageType, callback: (msg: object) => void) => void;
  sendMessage: (type: MessageType, data: object) => void;
}

const webSocketContext = React.createContext<WebSocketContext>({
  createNewGame: () => {},
  joinGame: () => {},
  startGame: () => {},
  closeConnection: () => {},
  subscribeToMessage: () => {},
  sendMessage: () => {},
});

export function useWebSocketContext(): WebSocketContext {
  const context = React.useContext(webSocketContext);

  if (!context) {
    throw new Error("useWebSocketContext must be called inside the WebSocketProvider");
  }

  return context;
}

function sendMessageToServer(ws: WebSocket | null, type: MessageType, data: object) {
  if (!ws) {
    console.warn("Cannot send the message. WebSocket connection is not established");
    return;
  }
  ws.send(JSON.stringify({ ...data, _type: type }));
  console.log(`sent ${type} message`);
}

interface CallbackRegistry {
  [key: string]: Array<(msg: object) => void>;
}

function onMessage(callbacks: CallbackRegistry) {
  return (data: MessageEvent) => {
    console.log("Message received: ");
    console.log({ data });

    const msg = JSON.parse(data.data ?? "{}");
    const callbackList = callbacks[msg._type];
    callbackList?.forEach((callback) => callback(msg));
  };
}

function WebSocketProvider(props: React.PropsWithChildren<{}>) {
  const [connected, setConnected] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  const { token } = useAuthContext();
  const [callbacks, setCallbacks] = useState<CallbackRegistry>({});

  function connectToWS() {
    console.log("starting connection");
    const newWs = new WebSocket(`ws://${webSocketUrl}/web-socket`);

    newWs.onopen = () => {
      console.log("Connected to server");
      // todo error handling
      sendMessageToServer(newWs, MessageType.jwt, { jwt: `Bearer ${token}` });
      // todo: handle negative case
      console.log("Connection approved");
      setConnected(true);
    };

    newWs.onmessage = onMessage(callbacks);

    setWs(newWs);
  }

  function sendMessage(type: MessageType, data: object) {
    sendMessageToServer(ws, type, data);
  }

  function createNewGame() {
    sendMessageToServer(ws, MessageType.newgame, {});
  }

  function startGame() {
    sendMessageToServer(ws, MessageType.startgame, {});
  }

  function joinGame(gameId: string) {
    sendMessageToServer(ws, MessageType.joingame, { gameId: gameId });
  }

  function closeConnection() {
    if (!ws) {
      console.warn("Cannot close connection. WebSocket connection is not established");
      return;
    }
    setConnected(false);
    ws.close();
  }

  function subscribeToMessage(type: MessageType, callback: (msg: object) => void) {
    setCallbacks((cs) => ({ ...cs, [type]: [...(cs[type] ?? []), callback] }));
  }

  useEffect(() => {
    console.log("connecting...");
    connectToWS();
  }, []);

  // todo check if we can improve that
  useEffect(() => {
    console.log("apply subscription change...");
    if (ws) {
      ws.onmessage = onMessage(callbacks);
    }
  }, [callbacks]);

  return (
    <webSocketContext.Provider
      value={{ createNewGame, joinGame, startGame, closeConnection, subscribeToMessage, sendMessage }}
    >
      {connected ? props.children : null}
    </webSocketContext.Provider>
  );
}

export default WebSocketProvider;
