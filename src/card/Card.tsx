import { CardDefinition } from "./types";
import * as css from "./Card.module.css";

function Card({ card }: { card: CardDefinition }) {
  return <div className={css.container}>{card.name}</div>;
}

export default Card;
