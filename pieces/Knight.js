import Piece from './Piece';
export default class Knight extends Piece {
  constructor(player, index) {
    super(player, index);
    this.icon = player === 'white' ? '\u2658' : '\u265E';
    this.generalMoves = [-17, -15, 17, 15, 10, -10, 6, -6];
  }

  static getInitialPositions() {
    return this.initialPositions;
  }

  generateMoves(currentBoard, indices) {
    let possibleMoves = [];
    
    let currentIndices = indices[this.player];

    let col = this.index % 8;
    let row = Math.floor(this.index / 8);

    for (let i = 0; i < this.generalMoves .length; i++) {
      let currentMove = this.index + this.generalMoves [i];
      let newCol = currentMove % 8;
      let newRow = Math.floor(this.index / 8);

      if (Math.abs(col - newCol) <= 2 && Math.abs(row - newRow) <= 2) {
        if (currentMove >= 0 && currentMove < 64){
          if (currentIndices.indexOf(currentMove) < 0){
            possibleMoves.push(currentMove);
          }
          
        }
        
      }
    }

    return possibleMoves;
  }


}

Knight.initialPositions = { white: [57, 62], black: [1, 6] };
