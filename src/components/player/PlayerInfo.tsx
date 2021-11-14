import { PlayerData } from "./types";

function PlayerInfo({ player }: { player: PlayerData | undefined }) {
  return player ? (
    <div>
      <div>{player?.name}</div>
      <div>
        {player?.health} / {player?.maxHealth}
      </div>
    </div>
  ) : null;
}

export default PlayerInfo;
