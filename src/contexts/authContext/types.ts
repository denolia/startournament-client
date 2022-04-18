export interface User {
  name: string;
}
export enum MessageType {
  jwt = "jwt",
  newgame = "newgame",
  joingame = "joingame",
  startgame = "startgame",
  gameList = "game_list",
  playcard = "playcard",
  skipturn = "skipturn",
}
