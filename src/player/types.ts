import { CardDefinition } from "../card/types";

export interface PlayerData {
  health: number;
  maxHealth: number;
  cards: CardDefinition[];
  name: string;
}
