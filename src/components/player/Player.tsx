import { useGameContext } from "../../game/gameContext/gameContext";
import { GameStatus } from "../../game/types";
import Card from "../card/Card";
import * as css from "./Player.module.css";
import PlayerInfo from "./PlayerInfo";
import { PlayerType } from "./types";

function Player() {
  const { player, gameStatus } = useGameContext();

  return (
    <div className={css.container}>
      <PlayerInfo
        player={player}
        playersTurn={gameStatus === GameStatus.PLAYER_1_TURN}
      />
      <div className={css.cards}>
        {player?.cards?.map((card) => (
          <Card key={card.id} card={card} player={PlayerType.PLAYER} />
        ))}
      </div>
    </div>
  );
}

export default Player;
