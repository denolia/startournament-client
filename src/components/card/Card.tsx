import { getImgUrl } from "../../api/getImgUrl";
import { usePlayerContext } from "../../game/gameContext/gameContext";
import * as css from "./Card.module.css";
import { CardDefinition } from "./types";

function Card({ card }: { card: CardDefinition }) {
  const { handleCardClick } = usePlayerContext();

  return (
    <div className={css.container} onClick={(e) => handleCardClick(card)}>
      <div>{card.name}</div>
      <div>
        <img src={getImgUrl(card.iconName)} width="100%" alt={card.name} />
      </div>
    </div>
  );
}

export default Card;
