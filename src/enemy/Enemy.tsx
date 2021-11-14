import Card from "../card/Card";
import * as css from "./Enemy.module.css";
import { usePlayerContext } from "../playerContext/playerContext";

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
