import SockJS from "sockjs-client";
import Stomp, { Client as StompClient } from "stompjs";

let stompClient: StompClient | null = null;
const webSocketUrl = "//192.168.2.104:8080/gs-guide-websocket";

function Playground() {
  function connectToWS() {
    console.log("starting connection");
    const endpoint = "hello";

    const socket = new SockJS(`http:${webSocketUrl}`);
    stompClient = Stomp.over(socket);
    stompClient.connect({ user: "vasya" }, (frame) => {
      // @ts-ignore
      let url = stompClient?.ws._transport.url;
      const sessionId = url
        .replace(`ws:${webSocketUrl}/`, "")
        .replace("/websocket", "")
        .replace(/^[0-9]+\//, "");
      console.log("Your current session is: " + sessionId);

      console.log("Connected: " + frame);
      stompClient?.subscribe("/topic/test-response/123", (greeting) => {
        console.log("received message from topic 123: ");

        console.log(JSON.parse(greeting.body));
      });
      stompClient?.subscribe("/topic/test-response/234", (greeting) => {
        console.log("received message from topic 234: ");

        console.log(JSON.parse(greeting.body));
      });
    });
  }

  function sendMsg() {
    const message = "how are you";
    stompClient?.send(
      "/app/test-request",
      { Authentication: "Bearer 123" , user: 'user987'},
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
      {/*<div*/}
      {/*  className={css.layout}*/}
      {/*  style={{ backgroundImage: getBackgroundImage() }}*/}
      {/*>*/}
      {/*  <GameProvider>*/}
      {/*    <div className={css.enemyPlayer}>*/}
      {/*      <Enemy />*/}
      {/*    </div>*/}
      {/*    <Table />*/}
      {/*    <div className={css.player}>*/}
      {/*      <Player />*/}
      {/*    </div>*/}
      {/*  </GameProvider>*/}
      {/*</div>*/}
    </>
  );
}

export default Playground;
