import { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { getGame, playCard } from "../../api/playerStateApi";
import { CardDefinition } from "../../components/card/types";
import { PlayerData } from "../../components/player/types";
import { GameStatus } from "../types";

const GameContext = React.createContext<GameContextType>({
  player: undefined,
  enemy: undefined,
  table: [],
  message: "",
  gameStatus: undefined,
  handleCardClick: () => {},
});

GameContext.displayName = "PlayerContext";

interface GameContextType {
  player: PlayerData | undefined;
  enemy: PlayerData | undefined;
  table: CardDefinition[];
  gameStatus: GameStatus | undefined;
  handleCardClick: (card: CardDefinition) => void;
  message: string;
}

export function useGameContext() {
  const context = useContext<GameContextType>(GameContext);

  if (context === undefined) {
    throw new Error(`usePlayerContext must be used within a PlayerProvider`);
  }
  return context;
}

function GameProvider({ children }: React.PropsWithChildren<{}>) {
  const [player, setPlayer] = useState<PlayerData | undefined>();
  const [enemy, setEnemy] = useState<PlayerData | undefined>();

  const [table, setTable] = useState<CardDefinition[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus | undefined>();
  const [message, setMessage] = useState<string>("");

  const updateState = (res: AxiosResponse) => {
    const data = res?.data;
    if (data) {
      setPlayer(data.player1);
      setEnemy(data.player2);
      setGameStatus(data.status as GameStatus | undefined);
      setMessage(data.message);
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
    player,
    enemy,
    health: player?.health ?? 0,
    enemyHealth: enemy?.health ?? 0,
    handleCardClick,
    gameStatus,
    table,
    message,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export default GameProvider;
