import { useGameContext } from "../../game/gameContext/gameContext";
import { GameStatus } from "../../game/types";
import Card from "../card/Card";
import PlayerInfo from "../player/PlayerInfo";
import * as css from "./Enemy.module.css";

function Enemy() {
  const { enemy, gameStatus } = useGameContext();

  return (
    <div className={css.container}>
      <PlayerInfo
        player={enemy}
        playersTurn={gameStatus === GameStatus.PLAYER_2_TURN}
      />
      <div className={css.cards}>
        {enemy?.cards?.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default Enemy;
