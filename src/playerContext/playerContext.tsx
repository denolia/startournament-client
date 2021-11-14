import { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getGame, playCard } from "../api/playerStateApi";
import { CardDefinition } from "../card/types";
import { GameStatus } from "../game/types";

const PlayerContext = React.createContext<PlayContextType>({
  hand: [],
  enemyHand: [],
  table: [],
  health: 0,
  enemyHealth: 0,
  gameStatus: undefined,
  handleCardClick: () => {},
});

PlayerContext.displayName = "PlayerContext";

interface PlayContextType {
  hand: CardDefinition[];
  enemyHand: CardDefinition[];
  table: CardDefinition[];
  health: number;
  enemyHealth: number;
  gameStatus: GameStatus | undefined;
  handleCardClick: (card: CardDefinition) => void;
}

export function usePlayerContext() {
  const context = useContext<PlayContextType>(PlayerContext);

  if (context === undefined) {
    throw new Error(`usePlayerContext must be used within a PlayerProvider`);
  }
  return context;
}

interface PlayerData {
  health: number;
  cards: CardDefinition[];
}

function PlayerProvider({ children }: React.PropsWithChildren<{}>) {
  const [player, setPlayer] = useState<PlayerData | undefined>();
  const [enemy, setEnemy] = useState<PlayerData | undefined>();

  const [table, setTable] = useState<CardDefinition[]>([]);

  const [gameStatus, setGameStatus] = useState<GameStatus | undefined>();

  const updateState = (res: AxiosResponse) => {
    const data = res?.data;
    if (data) {
      setPlayer(data.player1);
      setEnemy(data.player2);
      setGameStatus(data.status as GameStatus | undefined);
    }
  };

  useEffect(() => {
    async function fetchHand() {
      const res = await getGame();

      updateState(res);
    }
    fetchHand();
  }, []);

  const handleCardClick = async (card: CardDefinition) => {
    const res = await playCard(
      card,
      gameStatus === GameStatus.PLAYER_1_TURN ? "1" : "2"
    );

    updateState(res);
    setTable((cards) => [...cards, card]);

    console.log({ res });
  };

  const value = {
    hand: player?.cards ?? [],
    enemyHand: enemy?.cards ?? [],
    health: player?.health ?? 0,
    enemyHealth: enemy?.health ?? 0,
    handleCardClick,
    gameStatus,
    table,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export default PlayerProvider;
