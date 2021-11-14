import Card from "../card/Card";
import { CardDefinition } from "../card/types";


function Player({cards}: {cards: CardDefinition[]}) {

  return <div>
    {cards?.map (card => (<Card key={card.id} card={card}/>))}
  </div>
}

export default Player
