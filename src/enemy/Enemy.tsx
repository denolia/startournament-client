import Card from "../card/Card";
import PlayerInfo from "../player/PlayerInfo";
import { usePlayerContext } from "../playerContext/playerContext";
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
