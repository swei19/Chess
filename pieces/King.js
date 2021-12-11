import Piece from './Piece';
import Rook from '../pieces/Rook';
import Board from "../game/board"

export default class King extends Piece {
  constructor(player, index) {
    super(player, index);
    this.icon = player === 'white' ? '\u2654' : '\u265A';
    this.generalMoves = [-1, 1, -7, 7, 9, -9, 8, -8];
  }

  static getInitialPositions() {
    return this.initialPositions;
  }


  static checkIfLost(currentBoard, currentPlayer) {

    let currentPlayerPieces = currentBoard[currentPlayer];
    let currentKingIndex = currentBoard.kingPositions[currentPlayer];
  
    for (let i = 0; i < currentPlayerPieces.length; i++){
      //alert(JSON.stringify(currentPlayerPieces[i]))
      //alert(currentPlayerPieces.length + ":" + i + ": " + JSON.stringify(currentPlayerPieces))
      
      if (currentPlayerPieces[i].getIndex()){
        let currentPiece = currentPlayerPieces[i];
        let currentPieceMoves = currentPiece.getPossibleMoves();
        for (let j = 0; j < currentPieceMoves.length; j++){

          currentBoard.movePiece(currentPiece, currentPieceMoves[j])
          

          if(!King.kingIsChecked(currentBoard[currentPiece.opponent], currentKingIndex)){
            currentBoard.revertMove(currentPiece, currentPieceMoves[j])
       
            return false;
          } else {
            currentBoard.revertMove(currentPiece, currentPieceMoves[j])
          }
          
        }

      }
    }
    
    //alert("Hello")
    return true;
  }



  static kingIsChecked(opponentPieces, kingIndex) {
    let opponentMoves = [];
    for (let i = 0; i < opponentPieces.length; i++){
      if (opponentPieces[i].getIndex()){
        opponentMoves = opponentMoves.concat(opponentPieces[i].possibleMoves);

      }
    }
    return opponentMoves.indexOf(kingIndex) >= 0 ? true: false;
  }

  generateMoves(currentBoard, indices){

    let currentIndices = indices[this.player];
    let opponentIndices = indices[this.opponent];
    let illegalMoves = [];

    for (let i = 0; i < opponentIndices.length;i++){
      illegalMoves = illegalMoves.concat(currentBoard[opponentIndices[i]].getPossibleMoves())
    }



 
    let possibleMoves = [];
    let col = this.index % 8;
    let row = Math.floor(this.index / 8);

    for (let i = 0; i < this.generalMoves.length; i++) {
      let newCol = (this.index + this.generalMoves[i]) % 8;
      let newRow = Math.floor((this.index + this.generalMoves[i]) / 8);

      if (newCol >= 0 && Math.abs(newCol - col) <= 1) {
        if (newRow >= 0 && Math.abs(newRow - row) <= 1) {
          if (
            currentIndices.indexOf(this.generalMoves[i] + this.index) < 0 &&
            this.generalMoves[i] + this.index <= 63
          ) {
            if (illegalMoves.indexOf(this.generalMoves[i] + this.index) < 0){
                possibleMoves.push(this.generalMoves[i] + this.index);
            }
            
          }
        }
      }
    }

    let rookInitialPositions = Rook['initialPositions'][this.player];
    let currentKing = King['initialPositions'][this.player][0];

    for (let i = 0; i < rookInitialPositions.length; i++) {
      let currentRook = rookInitialPositions[i];
      if (
        !currentBoard[currentRook].moved &&
        !currentBoard[currentKing].moved
      ) {
        if (currentRook < currentKing) {
          if (illegalMoves.indexOf(currentKing - 2) < 0) {
            possibleMoves.push(currentKing - 2);
          }
        } else {
          if (illegalMoves.indexOf(currentKing + 2) < 0) {
            possibleMoves.push(currentKing + 2);
          }
        }
      }
    }

    return possibleMoves;
  
  }

}

King.initialPositions = { white: [60], black: [4] };
