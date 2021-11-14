import { CardDefinition } from "./types";

function Card({ card }: { card: CardDefinition }) {
  return <div>{card.name}</div>;
}

export default Card;
