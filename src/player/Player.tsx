import Card from "../card/Card";
import { CardDefinition } from "../card/types";
import * as css from "./Player.module.css";

function Player({ cards }: { cards: CardDefinition[] }) {
  return (
    <div className={css.container}>
      {cards?.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default Player;
