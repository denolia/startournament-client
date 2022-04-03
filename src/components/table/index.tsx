import { useGameContext } from "../../game/gameContext/gameContext";
import Card from "../card/Card";
import css from "./index.module.css";

function Table() {
  const { message, table } = useGameContext();
  return (
    <div className={css.container}>
      <div className={css.notification} style={{ opacity: message ? 1 : 0 }}>
        {message}
      </div>

      <div className={css.tableArea}>
        {table?.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default Table;
