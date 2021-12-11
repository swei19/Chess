import Piece from './Piece';
export default class Bishop extends Piece {
  constructor(player, index) {
    super(player, index);
    this.icon = player === 'white' ? '\u2657' : '\u265D';
    this.generalMovement = [9, 7, -7, -9];
  }

  static getInitialPositions() {
    return this.initialPositions;
  }

  generatePotentialMoves(currentMovement, numElements, indices) {
    let generatedMoves = [];
    let potentialMove = currentMovement;
    this.protectMoves = [];

    let currentIndices = indices[this.player];
    let opponentIndices = indices[this.opponent];

    for (let i = 0; i < numElements; i++) {
      let move = potentialMove + this.index;
      if (currentIndices.indexOf(move) >= 0) {
        generatedMoves.push(move);
        break;
      } else if (opponentIndices.indexOf(move) >= 0) {
        generatedMoves.push(move);
        break;
      } else {
        generatedMoves.push(move);
      }

      potentialMove += currentMovement;
    }

    return generatedMoves;
  }

  generateMoves(currentBoard, indices) {
    let possibleMoves = [];
    let col = this.index % 8;
    let row = Math.floor(this.index / 8);

    let numDownRight = 7 - Math.max(row, col);
    let numDownLeft = Math.min(col, 7 - row);
    let numUpRight = Math.min(row, 7 - col);
    let numUpLeft = Math.min(row, col);

    let maxMoves = [numDownRight, numDownLeft, numUpRight, numUpLeft];

    for (let i = 0; i < this.generalMovement.length; i++) {
      possibleMoves = possibleMoves.concat(
        this.generatePotentialMoves(
          this.generalMovement[i],
          maxMoves[i],
          indices
        )
      );
    }

    return possibleMoves;
  }
}
Bishop.initialPositions = { white: [58, 61], black: [2, 5] };
