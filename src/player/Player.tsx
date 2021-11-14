import Card from "../card/Card";
import { usePlayerContext } from "../playerContext/playerContext";
import * as css from "./Player.module.css";
import PlayerInfo from "./PlayerInfo";

function Player() {
  const { player } = usePlayerContext();

  return (
    <div className={css.container}>
      <PlayerInfo player={player} />

      {player?.cards?.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default Player;
