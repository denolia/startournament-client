import axios from "axios";
import { CardDefinition } from "../card/types";

export async function getCurrentHand(): Promise<any> {
  try {
    return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/state`);
  } catch (error) {
    console.log(error);
  }
}

export async function playCard(card: CardDefinition): Promise<any> {
  try {
    return await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/action?player=1&card=${card.id}`,
      {}
    );
  } catch (error) {
    console.log(error);
  }
}
