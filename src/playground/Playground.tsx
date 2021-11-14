import * as css from "./Playground.module.css";
import Player from "../player/Player";
import PlayerProvider from "../playerContext/playerContext";
import Enemy from "../enemy/Enemy";

function Playground() {
  const cardsPlayer1 = [
    { id: "1", name: "Fireball", iconName: "/" },
    { id: "2", name: "Healing", iconName: "/" },
    {
      id: "3",
      name: "Fireball",
      iconName: "/",
    },
    { id: "4", name: "Fireball", iconName: "/" },
  ];

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
