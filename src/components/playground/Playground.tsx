import PlayerProvider from "../../game/gameContext/gameContext";
import Enemy from "../enemy/Enemy";
import Player from "../player/Player";
import * as css from "./Playground.module.css";

function Playground() {
  return (
    <div className={css.layout}>
      <PlayerProvider>
        <div className={css.enemyPlayer}>
          <Enemy />
        </div>
        <div className={css.table}>{/*<Table />*/}</div>
        <div className={css.player}>
          <Player />
        </div>
      </PlayerProvider>
    </div>
  );
}

export default Playground;
