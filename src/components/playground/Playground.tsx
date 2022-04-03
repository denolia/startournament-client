import { useWebSocketContext } from "../../webSocketContext/WebSocketProvider";

function Playground() {
  const { connectToWS, closeConnection, sendMessage } = useWebSocketContext();

  return (
    <>
      <button onClick={connectToWS}>connect</button>
      <button onClick={() => sendMessage("hello")}>send msg</button>
      <button onClick={closeConnection}>close conn</button>
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
