import { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getGame, playCard } from "../api/playerStateApi";
import { CardDefinition } from "../card/types";
import { GameStatus } from "../game/types";

const PlayerContext = React.createContext<PlayContextType>({
  hand: [],
  enemyHand: [],
  table: [],
  health: 100,
  enemyHealth: 100,
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

function PlayerProvider({ children }: React.PropsWithChildren<{}>) {
  const [hand, setHand] = useState<CardDefinition[]>([]);
  const [table, setTable] = useState<CardDefinition[]>([]);
  const [enemyHand, setEnemyHand] = useState<CardDefinition[]>([]);
  const [health, setHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [gameStatus, setGameStatus] = useState<GameStatus | undefined>();

  const updateState = (res: AxiosResponse) => {
    const data = res?.data;
    if (data) {
      setHand(data.player1?.cards);
      setEnemyHand(data.player2?.cards);
      setHealth(data.player1?.health);
      setEnemyHealth(data.player2?.health);
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
    setHand((cards) => cards.filter((c) => c.id !== card.id));
    setTable((cards) => [...cards, card]);
    const res = await playCard(
      card,
      gameStatus === GameStatus.PLAYER_1_TURN ? "1" : "2"
    );

    updateState(res);

    console.log({ res });
  };

  const value = {
    hand,
    enemyHand,
    health,
    enemyHealth,
    handleCardClick,
    gameStatus,
    table,
  };

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export default PlayerProvider;
