import { getImgUrl } from "../api/getImgUrl";
import * as css from "./Card.module.css";
import { CardDefinition } from "./types";

function Card({ card }: { card: CardDefinition }) {
  return (
    <div className={css.container}>
      <div>{card.name}</div>
      <div>
        <img src={getImgUrl(card.iconName)} width="100%" alt={card.name} />
      </div>
    </div>
  );
}

export default Card;
