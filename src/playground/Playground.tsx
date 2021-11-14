import * as css from "./Playground.module.css";
import Player from "../player/Player";

function Playground() {
  const cardsPlayer1 = [
    { id: "1", name: "Fireball", imgUrl: "/" },
    { id: "2", name: "Healing", imgUrl: "/" },
    {
      id: "3",
      name: "Fireball",
      imgUrl: "/",
    },
    { id: "4", name: "Fireball", imgUrl: "/" },
  ];
  const cardsPlayer2 = [
    { id: "5", name: "Healing", imgUrl: "/" },
    { id: "6", name: "Fireball", imgUrl: "/" },
    {
      id: "7",
      name: "Healing",
      imgUrl: "/",
    },
    { id: "8", name: "Fireball", imgUrl: "/" },
  ];

  return (
    <div className={css.layout}>
      <div className={css.enemyPlayer}>
        <Player cards={cardsPlayer1} />
      </div>
      <div className={css.table}>{/*<Table />*/}</div>
      <div className={css.player}>
        <Player cards={cardsPlayer2} />
      </div>
    </div>
  );
}

export default Playground;
