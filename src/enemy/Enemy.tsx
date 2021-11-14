import Card from "../card/Card";
import { usePlayerContext } from "../playerContext/playerContext";
import * as css from "./Enemy.module.css";

function Enemy() {
  const { enemyHand } = usePlayerContext();

  return (
    <div className={css.container}>
      {enemyHand.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default Enemy;
