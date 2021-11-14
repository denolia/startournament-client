import axios from "axios";
import { CardDefinition } from "../components/card/types";

export async function getGame(): Promise<any> {
  try {
    return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/state`);
  } catch (error) {
    console.log(error);
  }
}

export async function playCard(
  card: CardDefinition,
  playerId: string
): Promise<any> {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/action?player=${playerId}&card=${card.id}`,
      {}
    );
  } catch (error) {
    console.log(error);
  }
}
