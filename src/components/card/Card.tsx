import { getImgUrl } from "../../api/getImgUrl";
import { useGameContext } from "../../game/gameContext/gameContext";
import * as css from "./Card.module.css";
import { CardDefinition } from "./types";

function Card({ card }: { card: CardDefinition }) {
  const { handleCardClick } = useGameContext();

  return (
    <div className={css.container} onClick={(e) => handleCardClick(card)}>
      <div className={css.title}>{card.name}</div>
      <div>
        <img src={getImgUrl(card.iconName)} width="100%" alt={card.name} />
      </div>
      <div className={css.description} title={card.description}>
        {card.description}
      </div>
    </div>
  );
}

export default Card;
