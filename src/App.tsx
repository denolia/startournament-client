import React from "react";
import "./App.css";
import Playground from "./components/playground/Playground";
import WebSocketProvider from "./webSocketContext/WebSocketProvider";

function App() {
  return (
    <div className="App">
      <WebSocketProvider>
        <Playground />
      </WebSocketProvider>
    </div>
  );
}

export default App;
