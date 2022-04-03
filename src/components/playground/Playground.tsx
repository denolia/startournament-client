
const webSocketUrl = "192.168.2.104:8080";
let ws: WebSocket | null = null;

function Playground() {
  function connectToWS() {
    console.log("starting connection");
    ws = new WebSocket(`ws://${webSocketUrl}/web-socket`);
    ws.onopen = () => {
      console.log("Connected to server");
    };
    ws.onmessage = (data) => {
      console.log("Message: ");
      console.log({ data });
    };
  }

  function sendMsg() {
    const message = "how are you";
    ws?.send(JSON.stringify({ content: message }));
  }

  function closeConn() {
      ws?.close();
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
