import { useEffect, useState } from "react";
import { MessageType } from "../../contexts/authContext/types";
import { useWebSocketContext } from "../../contexts/webSocketContext/WebSocketProvider";

interface WithGames {
  games: Array<string>;
}

function Playground() {
  const { closeConnection, createNewGame, joinGame, startGame, subscribeToMessage, sendMessage } =
    useWebSocketContext();
  const [games, setGames] = useState<Array<string>>([]);

  useEffect(() => {
    subscribeToMessage(MessageType.gameList, (msg: object) => {
      setGames((msg as WithGames).games);
    });
    sendMessage(MessageType.gameList, {});
  }, []);

  return (
    <>
      <button onClick={() => createNewGame()}>Create a new game</button>
      <button onClick={() => startGame()}>Start the game</button>
      <button onClick={closeConnection}>Disconnect</button>
      <div>
        <h3>Existing games:</h3>
        {games.map((game) => (
          <li style={{ display: "flex" }}>
            <div style={{ margin: 10 }}>{game}</div>
            <button onClick={() => joinGame(game)}>Join</button>
          </li>
        ))}
      </div>
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
