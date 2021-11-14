import React, { useContext, useEffect, useState } from "react";
import { getCurrentHand } from "../api/playerStateApi";
import { CardDefinition } from "../card/types";

const PlayerContext = React.createContext<PlayContextType>({
  hand: [],
  enemyHand: [],
  health: 100,
  enemyHealth: 100,
});

PlayerContext.displayName = "PlayerContext";

interface PlayContextType {
  hand: CardDefinition[];
  enemyHand: CardDefinition[];
  health: number;
  enemyHealth: number;
}

export function usePlayerContext() {
  const context = useContext<PlayContextType>(PlayerContext);

  if (context === undefined) {
    throw new Error(`usePlayerContext must be used within a PlayerProvider`);
  }
  return context;
}

function PlayerProvider({ children }: React.PropsWithChildren<{}>) {
  const [hand, setHand] = useState<CardDefinition[]>([]);
  const [enemyHand, setEnemyHand] = useState<CardDefinition[]>([]);
  const [health, setHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);

  useEffect(() => {
    async function fetchHand() {
      const res = await getCurrentHand();

      if (res?.data?.player1?.cards) {
        setHand(res.data?.player1.cards);
        setEnemyHand(res.data?.player2.cards);
        setHealth(res.data?.player1.health);
        setEnemyHealth(res.data?.player2.health);
      }
    }
    fetchHand();
  }, []);

  const value = {
    hand,
    enemyHand,
    health,
    enemyHealth,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export default PlayerProvider;
