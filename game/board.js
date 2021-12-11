import { StyleSheet } from 'react-native';
import * as React from 'react';
import Pawn from '../pieces/Pawn';
import Bishop from '../pieces/Bishop';
import King from '../pieces/King';
import Queen from '../pieces/Queen';
import Knight from '../pieces/Knight';
import Rook from '../pieces/Rook';

export default class Board {
  constructor() {
    this.board;
    this.pieces = [Pawn, Bishop, King, Queen, Knight, Rook];
    this.white = [];
    this.black = [];
    this.indices = { white: [], black: [] };
    this.kingPositions = {"white": 60, "black": 4}
    this.previousPiece;
    this.previousIndex;
  }
  initBoard = () => {
    this.board = Array(64).fill('');

    for (let i = 0; i < this.pieces.length; i++) {
      let currentPiece = this.pieces[i];
      let currentPieceInitialPositions = currentPiece.getInitialPositions();

      let currentPositions = currentPieceInitialPositions.black;
      currentPositions = currentPositions.concat(
        currentPieceInitialPositions.white
      );

      for (let j = 0; j < currentPositions.length; j++) {
        let k = currentPositions[j];
        if (j < currentPositions.length / 2) {
          let newPiece = new this.pieces[i]('black', k);
          this.board[k] = newPiece;
          this.black.push(newPiece);
        } else {
          let newPiece = new this.pieces[i]('white', k);
          this.board[k] = newPiece;
          this.white.push(newPiece);
        }

        if (i === 0) {
          this.board[k].currentPosition = k;
        }
      }
    }

    return this.board;
  };



  movePiece = (currentPiece, newIndex) => {

  

    if (currentPiece.player === this.board[newIndex].player){
      return;
    }
    this.previousIndex = currentPiece.getIndex();
    this.previousPiece = this.board[newIndex];
    this.board[currentPiece.getIndex()] = '';

    let newSquare = this.board[newIndex];

    if (newSquare != '' && newSquare.player != currentPiece.player) {
        newSquare.setIndex(null);
    }
    this.board[newIndex] = currentPiece;    
    currentPiece.setIndex(newIndex);

    
    if (currentPiece.getNumMoved() > 0) {
      currentPiece.moved = true;
    }

    if (currentPiece.constructor.name === "King"){
      this.kingPositions[currentPiece.player] = newIndex;

        if (Math.abs(this.previousIndex - newIndex) > 1) {
           
            this.castle(newIndex, currentPiece.player);
          }
        

     // alert(JSON.stringify(this.kingPositions) + " , " + newIndex);
    }
    this.generateIndices();
    this.generateAllMoves();

  };

    undoMove = (currentPiece, newIndex, oldPiece, oldIndex) => {

    
      this.board[newIndex] = oldPiece;
      this.board[oldIndex] = currentPiece;

      if (currentPiece.constructor.name === "King"){
        this.kingPositions[currentPiece.player] = oldIndex;
      }

      if (this.previousPiece != ""){
        oldPiece.setIndex(newIndex);
      }

      currentPiece.setIndex(oldIndex);
        this.generateIndices();
        this.generateAllMoves();

    

  }
  castle = (index, currentPlayer) => {
    
    if (index % 8 == 6) {
      let castleRookIndex = Rook['initialPositions'][currentPlayer][1];
      let castleNewIndex = castleRookIndex - 2;

      this.movePiece(this.board[Rook['initialPositions'][currentPlayer][1]], castleNewIndex);
      

    } else if (index % 8 == 2) {
      let castleRookIndex = Rook['initialPositions'][currentPlayer][0];
      let castleNewIndex = castleRookIndex + 3;
      this.movePiece(this.board[Rook['initialPositions'][currentPlayer][0]], castleNewIndex);
    }

    
  }

  revertMove = (currentPiece, newIndex) => {

    if (this.previousIndex != null && this.previousPiece != null){

      
      this.board[newIndex] = this.previousPiece;
      this.board[this.previousIndex] = currentPiece;
    

      if (currentPiece.constructor.name === "King"){
        this.kingPositions[currentPiece.player] = this.previousIndex;
      }

      if (this.previousPiece != ""){
        this.previousPiece.setIndex(newIndex);
      }

      currentPiece.setIndex(this.previousIndex);
              this.generateIndices();
        this.generateAllMoves();
        this.previousIndex = null;
        this.previousPiece = null

      }

    

  }

  generatePlayerMoves = (player) => {
   
    for (let i = 0; i < this[player].length; i++) {
      if (this[player][i].getIndex()) {
        this[player][i].setPossibleMoves(
          this[player][i].generateMoves(this.board, this.indices)
        );
      }
    }
    
  };

  generateAllMoves = () => {
    for (let i = 0; i < this.white.length; i++) {
      if (this.white[i].getIndex()) {
        this.white[i].setPossibleMoves(
          this.white[i].generateMoves(this.board, this.indices)
        );
      }
      if (this.black[i].getIndex()) {
        this.black[i].setPossibleMoves(
          this.black[i].generateMoves(this.board, this.indices)
        );
      }
    }
  };

  setBoard = board => {
    this.board = board;
  };

  generateIndices = () => {
    this.indices = { white: [], black: [] };
    for (let i = 0; i < this.white.length; i++) {
      if (this.white[i].getIndex()) {
        this.indices['white'].push(this.white[i].getIndex());
      }
      if (this.black[i].getIndex()) {
        this.indices['black'].push(this.black[i].getIndex());
      }
    }
  };
}


