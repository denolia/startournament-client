import React, { useContext, useEffect, useState } from "react";
import { getCurrentHand } from "../api/playerStateApi";
import { CardDefinition } from "../card/types";

const PlayerContext = React.createContext<PlayContextType>({ hand: [] });

PlayerContext.displayName = "PlayerContext";

interface PlayContextType {
  hand: CardDefinition[];
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

  useEffect(() => {
    async function fetchHand() {
      const res = await getCurrentHand();

      if (res?.data?.player1?.cards) {
        setHand(res.data?.player1.cards);
      }
    }
    fetchHand();
  }, []);

  const value = {
    hand,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export default PlayerProvider;
