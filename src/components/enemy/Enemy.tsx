import { usePlayerContext } from "../../game/gameContext/gameContext";
import Card from "../card/Card";
import PlayerInfo from "../player/PlayerInfo";
import * as css from "./Enemy.module.css";

function Enemy() {
  const { enemy } = usePlayerContext();

  return (
    <div className={css.container}>
      <PlayerInfo player={enemy} />

      {enemy?.cards?.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default Enemy;
