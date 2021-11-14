import { getImgUrl } from "../../api/getImgUrl";
import { useGameContext } from "../../game/gameContext/gameContext";
import { PlayerType } from "../player/types";
import * as css from "./Card.module.css";
import { CardDefinition } from "./types";

function Card({ card, player }: { card: CardDefinition; player?: PlayerType }) {
  const { handleCardClick } = useGameContext();

  return (
    <div
      className={css.container}
      onClick={(e) => player && handleCardClick(card, player)}
    >
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
