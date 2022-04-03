import React from "react";
import "./App.css";
import Playground from "./components/playground/Playground";
import AuthProvider from "./contexts/authContext/AuthProvider";
import WebSocketProvider from "./contexts/webSocketContext/WebSocketProvider";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <WebSocketProvider>
          <Playground />
        </WebSocketProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
