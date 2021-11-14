import { getTurnMarkerImgUrl } from "../../api/getImgUrl";
import * as css from "./PlayerInfo.module.css";
import { PlayerData } from "./types";

function PlayerInfo({
  player,
  playersTurn,
}: {
  player: PlayerData | undefined;
  playersTurn: boolean;
}) {
  return player ? (
    <div className={css.container}>
      <div>{player?.name}</div>
      <div>
        {player?.health} / {player?.maxHealth}
      </div>
      {playersTurn && (
        <img src={getTurnMarkerImgUrl()} width="100%" alt="your turn" />
      )}
    </div>
  ) : null;
}

export default PlayerInfo;
