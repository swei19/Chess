import Bishop from '../pieces/Bishop';
import Rock from '../pieces/Rook';
import Piece from './Piece';
export default class Queen extends Piece{
  constructor(player, index) {
    super(player, index)
    this.icon = player === 'white' ? '\u2655' : '\u265B';

  }

  static getInitialPositions() {
    return this.initialPositions;
  }

  generateMoves(currentBoard, indices){
    let possibleMoves = [];

    let potentialMoves = [];
    

    let rook = new Rock(this.player, this.index);
    let bishop = new Bishop(this.player, this.index);
    potentialMoves = potentialMoves.concat(
      rook.generateMoves(currentBoard, indices)
    );
    potentialMoves = potentialMoves.concat(
      bishop.generateMoves(currentBoard,indices)
    );

    for (let i = 0; i < potentialMoves.length; i++){
      if (currentBoard[potentialMoves[i]].player != this.player){
        possibleMoves.push(potentialMoves[i]);
      }
    }

    return potentialMoves;
  }


}

Queen.initialPositions = { white: [59], black: [3] };
