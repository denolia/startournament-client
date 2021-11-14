import { CardDefinition } from "./types";
import * as css from "./Card.module.css";

function Card({ card }: { card: CardDefinition }) {
  return (
    <div className={css.container}>
      <div>{card.name}</div>
      <div>
        <img
          src={`http://192.168.2.104:8080/icons/${card.iconName}`}
          width="100%"
        />
      </div>
    </div>
  );
}

export default Card;
