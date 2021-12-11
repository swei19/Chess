export default class Player {
  constructor(player, humanOrAi){
    this.player = player;
    this.humanOrAi = humanOrAi;
    this.opponent = player == "white" ? "black": "white";
  }
}