import { getBackgroundImage } from "../../api/getImgUrl";
import GameProvider from "../../game/gameContext/gameContext";
import Enemy from "../enemy/Enemy";
import Player from "../player/Player";
import Table from "../table";
import * as css from "./Playground.module.css";

function Playground() {
  return (
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
  );
}

export default Playground;
