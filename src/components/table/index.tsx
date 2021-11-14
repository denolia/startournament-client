import { useGameContext } from "../../game/gameContext/gameContext";
import Card from "../card/Card";
import * as css from "./index.module.css";

function Table() {
  const { message, table } = useGameContext();
  return (
    <>
      <div className={css.notification}>{message}</div>

      <div className={css.tableArea}>
        {table?.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </>
  );
}

export default Table;
