import { useState } from "react";
import { useWebSocketContext } from "../../contexts/webSocketContext/WebSocketProvider";

function Playground() {
  const [gameId, setGameId] = useState<string>("");
  const { closeConnection, createNewGame, joinGame, startGame } =
    useWebSocketContext();

  return (
    <>
      <button onClick={() => createNewGame()}>Create a new game</button>
      <input
        type="text"
        value={gameId}
        onChange={(e) => {
          setGameId(e.target.value);
        }}
      />
      <button onClick={() => joinGame(gameId)}>Join a game</button>
      <button onClick={() => startGame()}>Start the game</button>
      <button onClick={closeConnection}>Disconnect</button>
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
