import * as css from "./Playground.module.css";
import Player from "../player/Player";
import PlayerProvider from "../playerContext/playerContext";
import Enemy from "../enemy/Enemy";

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
