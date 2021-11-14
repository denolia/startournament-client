import { CardDefinition } from "../card/types";

export interface PlayerData {
  health: number;
  maxHealth: number;
  cards: CardDefinition[];
  name: string;
}

export enum PlayerType {
  PLAYER = 1,
  ENEMY = 2,
}
