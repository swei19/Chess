import Piece from './Piece';

import Queen from '../pieces/Queen';
export default class Pawn extends Piece {
  constructor(player, index) {
    super(player, index);
    this.icon = player === 'white' ? '\u2659' : '\u265F';
  }

  static getInitialPositions() {
    return this.initialPositions;
  }

  promotePawn() {
    return new Queen(this.player);
  }

  generateMoves(currentBoard, indices) {
    let currentMoves = [];

    if (this.player === 'white') {
      if (!currentBoard[this.index - 8].player) {
        currentMoves.push(-8 + this.index);
      }
    } else {
      if (!currentBoard[this.index + 8].player) {
        currentMoves.push(8 + this.index);
      }
    }

    if (!this.moved) {
      if (Pawn.initialPositions[this.player].indexOf(this.index) < 0) {
        this.moved = true;
      }

      if (
        this.player === 'white' &&
        currentBoard[this.index - 8].player == undefined
      ) {
        currentMoves.push(this.index - 16);
      } else if (
        this.player === 'black' &&
        currentBoard[this.index + 8].player == undefined
      ) {
        currentMoves.push(this.index + 16);
      }
    }

    if (this.player === 'white') {
      if (currentBoard[this.index - 9].player === 'black') {
        currentMoves.push(-9 + this.index);
      }
      if (currentBoard[this.index - 7].player === 'black') {
        currentMoves.push(-7 + this.index);
      }
    } else {
      if (currentBoard[this.index + 9].player === 'white') {
        currentMoves.push(9 + this.index);
      }
      if (currentBoard[this.index + 7].player === 'white') {
        currentMoves.push(7 + this.index);
      }
    }

    if (Pawn.enPassant) {
      if (Math.abs(this.index - Pawn.enPassant) == 1) {
        if (this.player === 'white') {
          currentMoves.push(Pawn.enPassant - 8);
        } else if (this.player === 'black') {
          currentMoves.push(Pawn.enPassant + 8);
        }
      }
    }
    return currentMoves;
  }

}

Pawn.initialPositions = {
  white: [48, 49, 50, 51, 52, 53, 54, 55],
  black: [8, 9, 10, 11, 12, 13, 14, 15],
};

Pawn.enPassant = null;
