import Card from "../card/Card";
import { CardDefinition } from "../card/types";
import * as css from "./Enemy.module.css";

function Enemy({ cards }: { cards?: CardDefinition[] }) {
  // const { ene } = usePlayerContext();

  return (
    <div className={css.container}>
      {cards?.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </div>
  );
}

export default Enemy;
