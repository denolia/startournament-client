import SockJS from "sockjs-client";
import Stomp, { Client as StompClient } from "stompjs";
import { getBackgroundImage } from "../../api/getImgUrl";
import GameProvider from "../../game/gameContext/gameContext";
import Enemy from "../enemy/Enemy";
import Player from "../player/Player";
import Table from "../table";
import css from "./Playground.module.css";

let stompClient: StompClient | null = null;

function Playground() {
  function connectToWS() {
    console.log("starting connection");
    const endpoint = "hello";

    const socket = new SockJS("http://192.168.2.104:8080/gs-guide-websocket");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame);
      stompClient?.subscribe("/topic/test-response", (greeting) => {
        console.log("received message: ");

        console.log(JSON.parse(greeting.body));
      });
    });
  }

  function sendMsg() {
    const message = "how are you";
    stompClient?.send(
      "/app/test-request",
      {},
      JSON.stringify({ content: message })
    );
  }

  function closeConn() {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("successfully disconnected");
      });
    }
  }

  return (
    <>
      <button onClick={connectToWS}>connect</button>
      <button onClick={sendMsg}>send msg</button>
      <button onClick={closeConn}>close conn</button>
      <div
        className={css.layout}
        style={{ backgroundImage: getBackgroundImage() }}
      >
        <GameProvider>
          <div className={css.enemyPlayer}>
            <Enemy />
          </div>
          <Table />
          <div className={css.player}>
            <Player />
          </div>
        </GameProvider>
      </div>
    </>
  );
}

export default Playground;
