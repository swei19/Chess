export default class Piece {
  constructor(player, index) {
    this.player = player;
    this.opponent = this.player == 'white' ? 'black' : 'white';
    this.moved = false;
    this.possibleMoves = [];
    this.index = index;
    this.numMoved = 0;
    this.protectMoves = [];
  }

  setIndex = (newIndex) => {
    this.index = newIndex;
  }

  getIndex = () => {
    return this.index;
  }

  setPossibleMoves = (moves) => {
    this.possibleMoves = moves;
  }

  getPossibleMoves = () => {
    return this.possibleMoves.slice();
  }

  incrementMoved = () => {
    this.numMoved += 1;
  }

  getNumMoved = () => {
    return this.numMoved;
  }


}
