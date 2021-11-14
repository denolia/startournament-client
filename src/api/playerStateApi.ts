import axios from "axios";
import { CardDefinition } from "../components/card/types";
import { PlayerType } from "../components/player/types";

export async function getGame(): Promise<any> {
  try {
    return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/state`);
  } catch (error) {
    console.log(error);
  }
}

export async function playCard(
  card: CardDefinition,
  player: PlayerType
): Promise<any> {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/action?player=${player}&card=${card.id}`,
      {}
    );
  } catch (error) {
    console.log(error);
  }
}
