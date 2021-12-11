import Piece from './Piece';
export default class Rook extends Piece {
  constructor(player, index) {
    super(player, index);
    this.icon = player === 'white' ? '\u2656' : '\u265C';
  }

  static getInitialPositions() {
    return this.initialPositions;
  }

 
  


  generatePossibleMoves2(
    currentMovement,
    numElements,
    currentBoard
  ) {
    let possibleMoves = [];
    let potentialMove = currentMovement;
    for (let i = 0; i < numElements; i++) {
      if (currentBoard[potentialMove + this.index].player == this.player) {
        break;
      } else if (currentBoard[potentialMove + this.index].player != null) {
        possibleMoves.push(potentialMove + this.index);
        break;
      }
      possibleMoves.push(potentialMove + this.index);
      potentialMove += currentMovement;
    }
    return possibleMoves;
  }

  generateMoves(currentBoard, indices){
    let possibleMoves = [];
    let col = this.index % 8;
    let row = Math.floor(this.index / 8);

    let currentMovement = 8;
    let numDown = 7 - row;

    possibleMoves = possibleMoves.concat(this.generatePossibleMoves2(
      currentMovement,
      numDown,
      currentBoard,
    ));

    currentMovement = -8;
    let numUp = row;

    possibleMoves = possibleMoves.concat(this.generatePossibleMoves2(
      currentMovement,
      numUp,
      currentBoard,
    ));

    currentMovement = 1;
    let numRight = 7 - col;

    possibleMoves = possibleMoves.concat(this.generatePossibleMoves2(
      currentMovement,
      numRight,
      currentBoard,
    ));

    currentMovement = -1;
    let numLeft = col;

    possibleMoves = possibleMoves.concat(this.generatePossibleMoves2(
      currentMovement,
      numLeft,
      currentBoard,
    ));

    if (Rook["initialPositions"][this.player].indexOf(this.index) < 0){
      this.moved = true;
    }

    return possibleMoves;
  
  }

  

}

Rook.initialPositions = { white: [56, 63], black: [0, 7] };
