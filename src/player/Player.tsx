import Card from "../card/Card";
import * as css from "./Player.module.css";
import { usePlayerContext } from "../playerContext/playerContext";

function Player() {
  const { hand } = usePlayerContext();

  return (
    <div className={css.container}>
      {hand.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default Player;
